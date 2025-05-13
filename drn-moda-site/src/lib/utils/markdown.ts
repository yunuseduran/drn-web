import { marked } from 'marked';

/**
 * Converts markdown text to HTML for proper rendering
 * @param markdown Markdown text to convert
 * @returns HTML string
 */
export function markdownToHtml(markdown: string | undefined | null): string {
  if (!markdown) return '';
  
  try {
    // Force the result to be a string
    const result = marked.parse(markdown) as string;
    return result;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return markdown;
  }
} 