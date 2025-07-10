import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content/suburbs');
const outputFile = path.join(__dirname, '../src/data/generatedSuburbs.json');

async function generateSuburbsData() {
  try {
    const files = await fs.readdir(contentDir);
    const suburbs = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(contentDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: markdownContent } = matter(content);

        const suburb = {
          ...data,
          content: markdownContent.trim()
        };

        suburbs.push(suburb);
      }
    }

    // Sort by name
    suburbs.sort((a, b) => a.name.localeCompare(b.name));

    await fs.writeJson(outputFile, suburbs, { spaces: 2 });
    console.log(`✅ Generated ${suburbs.length} suburbs data to ${outputFile}`);
  } catch (error) {
    console.error('❌ Error generating suburbs data:', error);
  }
}

generateSuburbsData(); 