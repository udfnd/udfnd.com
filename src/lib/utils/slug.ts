/**
 * Generate a URL-safe slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Replace Korean characters with romanization is complex, so we use a timestamp for uniqueness
    // Remove special characters except alphanumeric, spaces, hyphens, and Korean
    .replace(/[^\w\s\-가-힣]/g, '')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Add timestamp for uniqueness
    + '-' + Date.now().toString(36);
}

/**
 * Generate excerpt from HTML content
 */
export function generateExcerpt(htmlContent: string, maxLength: number = 150): string {
  // Remove HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, '');
  // Remove extra whitespace
  const cleanText = textContent.replace(/\s+/g, ' ').trim();
  // Truncate
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  return cleanText.substring(0, maxLength).trim() + '...';
}
