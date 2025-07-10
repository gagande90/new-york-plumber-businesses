import { marked } from 'marked';

export const parseMarkdown = async (content: string): Promise<string> => {
  return marked(content);
};

export const extractExcerpt = (content: string, maxLength: number = 150): string => {
  // Remove markdown formatting for excerpt
  const plainText = content
    .replace(/[#*`]/g, '')
    .replace(/\n/g, ' ')
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
};

export const extractHeadings = (content: string): string[] => {
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const headings: string[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1].trim());
  }
  
  return headings;
};

export const extractTableOfContents = (content: string): Array<{ level: number; text: string; id: string }> => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: Array<{ level: number; text: string; id: string }> = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    toc.push({ level, text, id });
  }
  
  return toc;
}; 