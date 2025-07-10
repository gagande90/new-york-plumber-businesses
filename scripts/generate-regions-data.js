import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content/regions');
const outputFile = path.join(__dirname, '../src/data/generatedRegions.json');

async function generateRegionsData() {
  try {
    const files = await fs.readdir(contentDir);
    const regions = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(contentDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: markdownContent } = matter(content);

        const region = {
          ...data,
          content: markdownContent.trim()
        };

        regions.push(region);
      }
    }

    // Sort by name
    regions.sort((a, b) => a.name.localeCompare(b.name));

    await fs.writeJson(outputFile, regions, { spaces: 2 });
    console.log(`✅ Generated ${regions.length} regions data to ${outputFile}`);
  } catch (error) {
    console.error('❌ Error generating regions data:', error);
  }
}

generateRegionsData(); 