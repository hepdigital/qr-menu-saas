/**
 * Domain utility functions
 * Provides dynamic domain handling for multi-tenant application
 */

/**
 * Get the base domain from environment variable
 * Falls back to Vercel domain if not set
 */
export function getBaseDomain(): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  
  // Remove protocol and www
  const domain = appUrl
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
  
  // If no domain set, use Vercel domain
  return domain || 'qr-menu-saas-sepia.vercel.app'
}

/**
 * Get the full restaurant menu URL
 * @param slug - Restaurant slug
 * @param tableNumber - Optional table number
 */
export function getRestaurantUrl(slug: string, tableNumber?: string): string {
  const baseDomain = getBaseDomain()
  let url = `https://${slug}.${baseDomain}`
  
  if (tableNumber) {
    url += `?table=${encodeURIComponent(tableNumber)}`
  }
  
  return url
}

/**
 * Get the panel URL
 */
export function getPanelUrl(): string {
  const baseDomain = getBaseDomain()
  return `https://panel.${baseDomain}`
}

/**
 * Get the admin URL
 */
export function getAdminUrl(): string {
  const baseDomain = getBaseDomain()
  return `https://admin.${baseDomain}`
}

/**
 * Get the main landing page URL
 */
export function getLandingUrl(): string {
  const baseDomain = getBaseDomain()
  return `https://${baseDomain}`
}

/**
 * Format restaurant subdomain for display
 * @param slug - Restaurant slug
 */
export function formatRestaurantDomain(slug: string): string {
  const baseDomain = getBaseDomain()
  return `${slug}.${baseDomain}`
}
