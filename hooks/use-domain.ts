'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to get the current base domain
 * Works on client-side by reading window.location
 */
export function useBaseDomain(): string {
  const [baseDomain, setBaseDomain] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      
      // For localhost
      if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
        setBaseDomain('localhost:3000')
        return
      }
      
      // Extract base domain from hostname
      // e.g., panel.qr-menu-saas-sepia.vercel.app -> qr-menu-saas-sepia.vercel.app
      // e.g., panel.qrmenu.app -> qrmenu.app
      const parts = hostname.split('.')
      
      if (parts.length >= 2) {
        // Take last 2 parts for most domains (domain.com)
        // Take last 3 parts for vercel (project.vercel.app)
        const isVercel = hostname.includes('vercel.app')
        const baseParts = isVercel ? parts.slice(-3) : parts.slice(-2)
        setBaseDomain(baseParts.join('.'))
      } else {
        setBaseDomain(hostname)
      }
    }
  }, [])

  return baseDomain
}

/**
 * Hook to get restaurant URL
 */
export function useRestaurantUrl(slug: string, tableNumber?: string): string {
  const baseDomain = useBaseDomain()
  
  if (!baseDomain) return ''
  
  let url = `https://${slug}.${baseDomain}`
  
  if (tableNumber) {
    url += `?table=${encodeURIComponent(tableNumber)}`
  }
  
  return url
}

/**
 * Hook to format restaurant domain for display
 */
export function useRestaurantDomain(slug: string): string {
  const baseDomain = useBaseDomain()
  
  if (!baseDomain) return 'loading...'
  
  return `${slug}.${baseDomain}`
}
