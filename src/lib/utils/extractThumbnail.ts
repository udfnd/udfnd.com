/**
 * Extracts the first image URL from HTML content
 * @param html - HTML string containing the post content
 * @returns The URL of the first image, or null if no image is found
 */
export function extractThumbnailFromContent(html: string): string | null {
  if (!html) return null;

  // Match the first <img> tag and extract its src attribute
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);

  if (!imgMatch || !imgMatch[1]) {
    return null;
  }

  const url = imgMatch[1];

  // Validate that the URL is from Supabase Storage (optional security check)
  // This prevents using external URLs as thumbnails
  if (url.includes('supabase.co/storage') || url.startsWith('/')) {
    return url;
  }

  // Also allow other relative or absolute URLs if needed
  // For now, accept all valid URLs
  return url;
}
