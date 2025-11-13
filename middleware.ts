import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()
  
  // Extract subdomain from hostname
  // Handle both production (qrmenu.app) and localhost scenarios
  const isLocalhost = hostname.includes('localhost')
  
  let subdomain = ''
  
  if (isLocalhost) {
    // For local development, check for subdomain in localhost:3000 format
    // or use query parameter for testing: ?subdomain=panel
    subdomain = url.searchParams.get('subdomain') || ''
  } else {
    // Extract subdomain from hostname (e.g., panel.qrmenu.app -> panel)
    const parts = hostname.split('.')
    
    // If we have at least 3 parts (subdomain.domain.tld), extract subdomain
    if (parts.length >= 3) {
      subdomain = parts[0]
      
      // Ignore 'www' as a subdomain
      if (subdomain === 'www') {
        subdomain = ''
      }
    }
  }
  
  // Main domain (no subdomain or www) - Landing Site
  if (!subdomain || subdomain === 'www') {
    // Rewrite to /landing route
    url.pathname = `/landing${url.pathname === '/' ? '' : url.pathname}`
    return NextResponse.rewrite(url)
  }
  
  // Panel subdomain - Restaurant Panel
  if (subdomain === 'panel') {
    // Rewrite to /panel route
    url.pathname = `/panel${url.pathname === '/' ? '' : url.pathname}`
    return NextResponse.rewrite(url)
  }
  
  // Admin subdomain - Super Admin Panel
  if (subdomain === 'admin') {
    // Rewrite to /admin route
    url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`
    return NextResponse.rewrite(url)
  }
  
  // Restaurant subdomain - Digital Menu
  // Any other subdomain is treated as a restaurant slug
  // Pass subdomain as search param for restaurant lookup
  url.searchParams.set('restaurant', subdomain)
  url.pathname = `/menu${url.pathname === '/' ? '' : url.pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Match all paths except:
  // - API routes
  // - Static files (_next/static)
  // - Image optimization (_next/image)
  // - Favicon and other public files
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)' 
  ],
}
