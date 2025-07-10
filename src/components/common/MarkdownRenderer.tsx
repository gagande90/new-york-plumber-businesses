import React from 'react';
import { parseMarkdown } from '../../utils/markdownLoader';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const [htmlContent, setHtmlContent] = React.useState<string>('');

  React.useEffect(() => {
    const renderMarkdown = async () => {
      try {
        const html = await parseMarkdown(content);
        setHtmlContent(html);
      } catch (error) {
        console.error('Error parsing markdown:', error);
        setHtmlContent(content); // Fallback to plain text
      }
    };

    renderMarkdown();
  }, [content]);

  return (
    <div 
      className={`prose prose-gray max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer; 