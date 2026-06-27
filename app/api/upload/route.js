import { NextResponse } from 'next/server';

export async function POST(request) {
  const { filename, base64 } = await request.json();

  if (!filename || !base64) {
    return NextResponse.json({ error: 'Missing filename or base64' }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'Amrsamy19';
  const repo = process.env.GITHUB_REPO || 'portfolio-v2';
  const branch = process.env.GITHUB_BRANCH || 'master';
  const filePath = `public/projects/${filename}`;

  if (!token) {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const localPath = path.resolve(process.cwd(), filePath);
      const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
      fs.writeFileSync(localPath, Buffer.from(base64Data, 'base64'));
      return NextResponse.json({ success: true, path: `/projects/${filename}` }, { status: 200 });
    } catch (fsErr) {
      return NextResponse.json({ error: 'GITHUB_TOKEN is missing and local write failed: ' + fsErr.message }, { status: 500 });
    }
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
      return NextResponse.json({ error: 'Failed to upload to GitHub', details: errorText }, { status: commitResponse.status });
    }

    return NextResponse.json({ success: true, path: `/projects/${filename}` }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
