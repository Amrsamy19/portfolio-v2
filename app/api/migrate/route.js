import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export const dynamic = 'force-dynamic';

const connectionString = process.env.PRISMA_DATABASE_URL || "postgres://dummy:dummy@dummy/dummy";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET() {
  try {
    // 1. Prisma handles table creation via 'db push', so we just assume it exists here

    // 2. Read existing JSON files
    const cwd = process.cwd();
    const projectsPath = path.resolve(/*turbopackIgnore: true*/ cwd, 'src/data/projects.json');
    const enPath = path.resolve(/*turbopackIgnore: true*/ cwd, 'src/translation/en-translation.json');
    const arPath = path.resolve(/*turbopackIgnore: true*/ cwd, 'src/translation/ar-translation.json');

    const migrateFile = async (id, filePath) => {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(raw); // Validate JSON
        await prisma.content.upsert({
          where: { id },
          update: { data: jsonData },
          create: { id, data: jsonData }
        });
      }
    };

    await migrateFile('projects', projectsPath);
    await migrateFile('en-translation', enPath);
    await migrateFile('ar-translation', arPath);

    return NextResponse.json({ success: true, message: 'Migration completed successfully!' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
