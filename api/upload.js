import { Buffer } from 'buffer';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filename, base64 } = req.body;
  if (!filename || !base64) {
    return res.status(400).json({ error: 'Missing filename or base64' });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'Amrsamy19';
  const repo = process.env.GITHUB_REPO || 'portfolio-v2';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = `public/projects/${filename}`;

  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN is missing. Cannot upload image in production.' });
  }

  try {
    // Check if file exists to get SHA
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

    // Prepare content (strip data:image/png;base64, if present)
    const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;

    const commitResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({
        message: `Upload ${filename} from admin dashboard`,
        content: base64Data,
        branch: branch,
        ...(sha ? { sha } : {})
      })
    });

    if (!commitResponse.ok) {
      const errorText = await commitResponse.text();
      return res.status(commitResponse.status).json({ error: 'Failed to upload to GitHub', details: errorText });
    }

    return res.status(200).json({ success: true, path: `/projects/${filename}` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
