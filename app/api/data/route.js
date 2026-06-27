import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
  const type = request.headers.get('x-data-type') || new URL(request.url).searchParams.get('type');
  
  if (!type) {
    return NextResponse.json({ error: 'Missing type parameter' }, { status: 400 });
  }

  try {
    const contentData = await prisma.content.findUnique({
      where: { id: type }
    });
    
    if (contentData) {
      return NextResponse.json(contentData.data);
    }
    
    // If not found in DB, try to fallback to local file so it doesn't break before migration
    try {
      const fs = await import('fs');
      const path = await import('path');
      let filePath = '';
      if (type === 'projects') filePath = 'src/data/projects.json';
      else if (type === 'en-translation') filePath = 'src/translation/en-translation.json';
      else if (type === 'ar-translation') filePath = 'src/translation/ar-translation.json';
      
      if (filePath) {
        const localPath = path.resolve(/*turbopackIgnore: true*/ process.cwd(), filePath);
        if (fs.existsSync(localPath)) {
          return new NextResponse(fs.readFileSync(localPath, 'utf-8'), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
    } catch(e) {}
    
    return NextResponse.json({}, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { type, content } = await request.json();
  
  try {
    await prisma.content.upsert({
      where: { id: type },
      update: { data: content },
      create: { id: type, data: content }
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
