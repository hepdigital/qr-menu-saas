import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()
  const pathname = url.pathname
  
  // Skip middleware for these paths - let Next.js handle them directly
  if (
    pathname.startsWith('/panel') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }
  
  // Extract subdomain from hostname
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1')
  
  let subdomain = ''
  
  if (isLocalhost) {
    // For local development, use query parameter for testing: ?subdomain=panel
    subdomain = url.searchParams.get('subdomain') || ''
  } else {
    // Extract subdomain from hostname (e.g., panel.qr-menu-saas-sepia.vercel.app -> panel)
    const parts = hostname.split('.')
    
    // For Vercel: qr-menu-saas-sepia.vercel.app has 3 parts (no subdomain)
    // panel.qr-menu-saas-sepia.vercel.app has 4 parts (subdomain = panel)
    if (parts.length >= 4) {
      subdomain = parts[0]
      
      // Ignore 'www' as a subdomain
      if (subdomain === 'www') {
        subdomain = ''
      }
    }
  }
  
  // Main domain (no subdomain) - Landing Site
  if (!subdomain) {
    // Show landing page for root path
    if (pathname === '/') {
      return NextResponse.next()
    }
    // For other paths on main domain, let Next.js handle them
    return NextResponse.next()
  }
  
  // Panel subdomain - Restaurant Panel
  if (subdomain === 'panel') {
    // Rewrite to /panel route
    url.pathname = `/panel${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }
  
  // Admin subdomain - Super Admin Panel
  if (subdomain === 'admin') {
    // Rewrite to /admin route
    url.pathname = `/admin${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }
  
  // Restaurant subdomain - Digital Menu
  // Any other subdomain is treated as a restaurant slug
  url.searchParams.set('restaurant', subdomain)
  url.pathname = `/menu${pathname === '/' ? '' : pathname}`
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
