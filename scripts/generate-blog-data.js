import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content/blog');
const outputFile = path.join(__dirname, '../src/data/generatedBlogPosts.json');

async function generateBlogData() {
  try {
    const files = await fs.readdir(contentDir);
    const blogPosts = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(contentDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: markdownContent } = matter(content);

        const blogPost = {
          ...data,
          content: markdownContent.trim()
        };

        blogPosts.push(blogPost);
      }
    }

    // Sort by date (newest first)
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    await fs.writeJson(outputFile, blogPosts, { spaces: 2 });
    console.log(`✅ Generated ${blogPosts.length} blog posts data to ${outputFile}`);
  } catch (error) {
    console.error('❌ Error generating blog data:', error);
  }
}

generateBlogData(); 