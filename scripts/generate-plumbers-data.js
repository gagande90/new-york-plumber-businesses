import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content/plumbers');
const outputFile = path.join(__dirname, '../src/data/generatedPlumbers.json');

async function generatePlumbersData() {
  try {
    const files = await fs.readdir(contentDir);
    const plumbers = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(contentDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: markdownContent } = matter(content);

        const plumber = {
          ...data,
          content: markdownContent.trim()
        };

        plumbers.push(plumber);
      }
    }

    // Sort by business name
    plumbers.sort((a, b) => a.businessName.localeCompare(b.businessName));

    await fs.writeJson(outputFile, plumbers, { spaces: 2 });
    console.log(`✅ Generated ${plumbers.length} plumbers data to ${outputFile}`);
  } catch (error) {
    console.error('❌ Error generating plumbers data:', error);
  }
}

generatePlumbersData(); 