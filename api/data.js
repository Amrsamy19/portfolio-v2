import { Buffer } from 'buffer';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  const { method, headers, body } = req;
  const type = method === 'GET' ? headers['x-data-type'] : body?.type;

  let filePath = '';
  if (type === 'projects') {
    filePath = 'src/data/projects.json';
  } else if (type === 'en-translation') {
    filePath = 'src/translation/en-translation.json';
  } else if (type === 'ar-translation') {
    filePath = 'src/translation/ar-translation.json';
  } else {
    return res.status(400).json({ error: 'Invalid type' });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'Amrsamy19';
  const repo = process.env.GITHUB_REPO || 'portfolio-v2';
  const branch = process.env.GITHUB_BRANCH || 'master'; // default to master

  if (method === 'GET') {
    try {
      if (!token) {
        // Fallback for local development if Vite middleware doesn't intercept
        const fs = await import('fs');
        const path = await import('path');
        const localPath = path.resolve(process.cwd(), filePath);
        if (fs.existsSync(localPath)) {
          const data = fs.readFileSync(localPath, 'utf-8');
          return res.status(200).send(data);
        }
        return res.status(404).json({ error: 'File not found locally and no GITHUB_TOKEN provided.' });
      }

      // Fetch from GitHub directly to get freshest data
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3.raw',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: 'Failed to fetch from GitHub', details: errorText });
      }

      const text = await response.text();
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(text);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (method === 'POST') {
    if (!token) {
      return res.status(500).json({ error: 'GITHUB_TOKEN is missing. Cannot save changes in production.' });
    }

    try {
      // 1. Get current file to get the SHA
      let sha = null;
      const getFileResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        sha = fileData.sha;
      }

      // 2. Commit the new file
      const contentBase64 = Buffer.from(JSON.stringify(body.content, null, 2)).toString('base64');
      
      const commitResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28'
        },
        body: JSON.stringify({
          message: `Update ${type} from admin dashboard`,
          content: contentBase64,
          branch: branch,
          ...(sha ? { sha } : {})
        })
      });

      if (!commitResponse.ok) {
        const errorText = await commitResponse.text();
        return res.status(commitResponse.status).json({ error: 'Failed to commit to GitHub', details: errorText });
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
