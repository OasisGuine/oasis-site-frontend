/**
 * Get asset URL with proper base path for deployment
 * @param path - Asset path starting with /assets/
 * @returns Full asset URL with base path
 */
export const getAssetUrl = (path: string): string => {
  const basePath = import.meta.env.VITE_BASE_PATH || '/';
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // If base path is just '/', return the path as is
  if (basePath === '/') {
    return normalizedPath;
  }
  
  // Remove trailing slash from base path and combine
  const cleanBasePath = basePath.replace(/\/$/, '');
  return `${cleanBasePath}${normalizedPath}`;
};