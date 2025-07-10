# Content Management System

This project uses a markdown-based content management system where all content is authored in markdown files and automatically converted to JSON for the frontend.

## Content Structure

### Content Directories

- `content/suburbs/` - One markdown file per suburb
- `content/plumbers/` - One markdown file per plumber/business
- `content/blog/` - One markdown file per blog post
- `content/regions/` - One markdown file per region
- `content/resources/` - One markdown file per resource/guide

### Generated Data Files

- `src/data/generatedSuburbs.json` - Processed suburbs data
- `src/data/generatedPlumbers.json` - Processed plumbers data
- `src/data/generatedBlogPosts.json` - Processed blog posts data
- `src/data/generatedRegions.json` - Processed regions data
- `src/data/generatedResources.json` - Processed resources data

## Content Workflow

### 1. Author Content in Markdown

Create markdown files in the appropriate `content/` subdirectory with frontmatter metadata:

```markdown
---
id: "unique-id"
title: "Content Title"
slug: "url-slug"
description: "Brief description"
category: "Category"
tags: ["tag1", "tag2"]
author: "Author Name"
date: "2024-01-15"
---

# Content Title

Your markdown content here...

## Section 1

Content for section 1...

## Section 2

Content for section 2...
```

### 2. Generate Data Files

Run the content generation script to convert markdown to JSON:

```bash
npm run generate-content
```

This will:
- Read all markdown files from content directories
- Parse frontmatter metadata
- Convert markdown content to HTML
- Generate structured JSON files
- Sort and organize the data

### 3. Frontend Consumption

The React frontend imports the generated JSON files and uses utility loaders:

```typescript
import { getSuburbs, getSuburbBySlug } from '@/utils/suburbLoader';
import { getPlumbers, getPlumberById } from '@/utils/plumberLoader';
import { getBlogPosts, getBlogPostBySlug } from '@/utils/blogLoader';
```

## Content Types

### Suburbs

**File:** `content/suburbs/suburb-name.md`

**Required Frontmatter:**
- `id` - Unique identifier
- `name` - Suburb name
- `region` - Region (Inner Melbourne, Northern Suburbs, etc.)
- `slug` - URL slug
- `description` - Brief description

**Optional Frontmatter:**
- `population` - Population number
- `area` - Area in km²
- `postcode` - Postcode

### Plumbers

**File:** `content/plumbers/business-name.md`

**Required Frontmatter:**
- `id` - Unique identifier
- `businessName` - Business name
- `description` - Brief description
- `services` - Array of services offered
- `areasServiced` - Array of suburb IDs
- `phone` - Phone number
- `email` - Email address

**Optional Frontmatter:**
- `website` - Website URL
- `address` - Business address
- `logo` - Logo image path
- `rating` - Average rating
- `reviewCount` - Number of reviews

### Blog Posts

**File:** `content/blog/post-title.md`

**Required Frontmatter:**
- `id` - Unique identifier
- `title` - Post title
- `slug` - URL slug
- `excerpt` - Brief excerpt
- `category` - Blog category
- `tags` - Array of tags
- `author` - Author name
- `date` - Publication date

**Optional Frontmatter:**
- `featuredImage` - Featured image path
- `readTime` - Estimated read time

## Utility Loaders

### Suburb Loader (`src/utils/suburbLoader.ts`)

- `getSuburbs()` - Get all suburbs
- `getSuburbBySlug(slug)` - Get suburb by slug
- `getSuburbsByRegion(region)` - Get suburbs by region
- `searchSuburbs(query)` - Search suburbs

### Plumber Loader (`src/utils/plumberLoader.ts`)

- `getPlumbers()` - Get all plumbers
- `getPlumberById(id)` - Get plumber by ID
- `getPlumbersBySuburb(suburbId)` - Get plumbers by suburb
- `searchPlumbers(query)` - Search plumbers
- `getPlumbersByService(service)` - Get plumbers by service

### Blog Loader (`src/utils/blogLoader.ts`)

- `getBlogPosts()` - Get all blog posts
- `getBlogPostBySlug(slug)` - Get blog post by slug
- `getBlogPostsByCategory(category)` - Get posts by category
- `searchBlogPosts(query)` - Search blog posts
- `getRecentBlogPosts(limit)` - Get recent posts
- `getBlogCategories()` - Get all categories

### Markdown Loader (`src/utils/markdownLoader.ts`)

- `parseMarkdown(content)` - Convert markdown to HTML
- `extractExcerpt(content, maxLength)` - Extract excerpt from content
- `extractHeadings(content)` - Extract headings from content
- `extractTableOfContents(content)` - Generate table of contents

## Components

### MarkdownRenderer (`src/components/common/MarkdownRenderer.tsx`)

A React component that renders markdown content with proper styling:

```tsx
import MarkdownRenderer from '@/components/common/MarkdownRenderer';

<MarkdownRenderer 
  content={markdownContent} 
  className="prose max-w-none" 
/>
```

## Scripts

### Individual Generation Scripts

- `node scripts/generate-suburbs-data.js` - Generate suburbs data
- `node scripts/generate-plumbers-data.js` - Generate plumbers data
- `node scripts/generate-blog-data.js` - Generate blog data
- `node scripts/generate-regions-data.js` - Generate regions data
- `node scripts/generate-resources-data.js` - Generate resources data

### Master Script

- `npm run generate-content` - Generate all content data

## Best Practices

### Content Authoring

1. **Use descriptive filenames** - Use kebab-case for filenames
2. **Include all required frontmatter** - Ensure all required fields are present
3. **Write clear, SEO-friendly content** - Use proper headings and structure
4. **Include relevant metadata** - Add tags, categories, and descriptions
5. **Use consistent formatting** - Follow markdown best practices

### Content Updates

1. **Edit markdown files** in the appropriate content directory
2. **Run generation script** to update JSON data
3. **Test changes** in development environment
4. **Commit both markdown and JSON** files to version control

### Performance

- Generated JSON files are cached by the build system
- Content is loaded at build time, not runtime
- Markdown parsing is done during build, not in browser
- Images and assets are optimized during build

## Troubleshooting

### Common Issues

1. **Missing frontmatter** - Ensure all required fields are present
2. **Invalid markdown** - Check markdown syntax
3. **File not found** - Verify file path and extension
4. **Build errors** - Check console for specific error messages

### Debugging

1. **Check generated JSON** - Verify data structure
2. **Test individual scripts** - Run scripts separately
3. **Validate markdown** - Use markdown linter
4. **Check file permissions** - Ensure read/write access

## Migration from Mock Data

The project has been migrated from hardcoded mock data to markdown-based content:

1. **Old system:** `src/data/mockData.ts` (hardcoded data)
2. **New system:** Markdown files + generated JSON + utility loaders

### Migration Steps

1. ✅ Create content directories
2. ✅ Create generation scripts
3. ✅ Create utility loaders
4. ✅ Update page components
5. ✅ Add markdown renderer
6. ✅ Update types
7. ✅ Create sample content
8. ✅ Test functionality

The system is now fully operational and ready for content management! 