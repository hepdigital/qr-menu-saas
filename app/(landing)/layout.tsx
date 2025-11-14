import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QR Menu - Digital Menu Platform for Restaurants',
  description: 'Create stunning QR code menus for your restaurant in minutes. No technical skills required. Fully customizable and mobile-optimized.',
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
