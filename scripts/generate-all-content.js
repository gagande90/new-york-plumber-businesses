import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Generating all content data...\n');

try {
  // Generate suburbs data
  console.log('📝 Generating suburbs data...');
  execSync('node scripts/generate-suburbs-data.js', { stdio: 'inherit' });
  
  // Generate plumbers data
  console.log('\n🔧 Generating plumbers data...');
  execSync('node scripts/generate-plumbers-data.js', { stdio: 'inherit' });
  
  // Generate blog data
  console.log('\n📰 Generating blog data...');
  execSync('node scripts/generate-blog-data.js', { stdio: 'inherit' });
  
  // Generate regions data
  console.log('\n🗺️ Generating regions data...');
  execSync('node scripts/generate-regions-data.js', { stdio: 'inherit' });
  
  // Generate resources data
  console.log('\n📚 Generating resources data...');
  execSync('node scripts/generate-resources-data.js', { stdio: 'inherit' });
  
  console.log('\n✅ All content data generated successfully!');
  console.log('\n📁 Generated files:');
  console.log('   - src/data/generatedSuburbs.json');
  console.log('   - src/data/generatedPlumbers.json');
  console.log('   - src/data/generatedBlogPosts.json');
  console.log('   - src/data/generatedRegions.json');
  console.log('   - src/data/generatedResources.json');
  
} catch (error) {
  console.error('\n❌ Error generating content:', error.message);
  process.exit(1);
} 