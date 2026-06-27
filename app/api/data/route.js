import { NextResponse } from 'next/server';

export async function GET(request) {
  const type = request.headers.get('x-data-type');
  return handleDataRequest('GET', type, null);
}

export async function POST(request) {
  const body = await request.json();
  return handleDataRequest('POST', body.type, body.content);
}

async function handleDataRequest(method, type, contentBody) {
  let filePath = '';
  if (type === 'projects') {
    filePath = 'src/data/projects.json';
  } else if (type === 'en-translation') {
    filePath = 'src/translation/en-translation.json';
  } else if (type === 'ar-translation') {
    filePath = 'src/translation/ar-translation.json';
  } else {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'Amrsamy19';
  const repo = process.env.GITHUB_REPO || 'portfolio-v2';
  const branch = process.env.GITHUB_BRANCH || 'master';

  if (method === 'GET') {
    try {
      if (!token) {
        const fs = await import('fs');
        const path = await import('path');
        const localPath = path.resolve(/*turbopackIgnore: true*/ process.cwd(), filePath);
        if (fs.existsSync(localPath)) {
          const data = fs.readFileSync(localPath, 'utf-8');
          return new NextResponse(data, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        return NextResponse.json({ error: 'File not found locally and no GITHUB_TOKEN provided.' }, { status: 404 });
      }

      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3.raw',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        return NextResponse.json({ error: 'Failed to fetch from GitHub', details: errorText }, { status: response.status });
      }

      const text = await response.text();
      return new NextResponse(text, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  if (method === 'POST') {
    if (!token) {
      return NextResponse.json({ error: 'GITHUB_TOKEN is missing. Cannot save changes in production.' }, { status: 500 });
    }

    try {
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

      const contentBase64 = Buffer.from(JSON.stringify(contentBody, null, 2)).toString('base64');
      
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
        return NextResponse.json({ error: 'Failed to commit to GitHub', details: errorText }, { status: commitResponse.status });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
