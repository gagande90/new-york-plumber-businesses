import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content/resources');
const outputFile = path.join(__dirname, '../src/data/generatedResources.json');

async function generateResourcesData() {
  try {
    const files = await fs.readdir(contentDir);
    const resources = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(contentDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: markdownContent } = matter(content);

        const resource = {
          ...data,
          content: markdownContent.trim()
        };

        resources.push(resource);
      }
    }

    // Sort by title
    resources.sort((a, b) => a.title.localeCompare(b.title));

    await fs.writeJson(outputFile, resources, { spaces: 2 });
    console.log(`✅ Generated ${resources.length} resources data to ${outputFile}`);
  } catch (error) {
    console.error('❌ Error generating resources data:', error);
  }
}

generateResourcesData(); 