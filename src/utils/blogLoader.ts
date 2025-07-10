import blogPostsData from '../data/generatedBlogPosts.json';
import { BlogPost, BlogCategory } from '../types';

export const getBlogPosts = (): BlogPost[] => {
  return blogPostsData as BlogPost[];
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPostsData.find((post: BlogPost) => post.slug === slug);
};

export const getBlogPostsByCategory = (category: BlogCategory): BlogPost[] => {
  return blogPostsData.filter((post: BlogPost) => post.category === category);
};

export const searchBlogPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogPostsData.filter((post: BlogPost) =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRecentBlogPosts = (limit: number = 5): BlogPost[] => {
  return blogPostsData.slice(0, limit);
};

export const getBlogCategories = (): BlogCategory[] => {
  const categories = new Set(blogPostsData.map((post: BlogPost) => post.category));
  return Array.from(categories);
}; 