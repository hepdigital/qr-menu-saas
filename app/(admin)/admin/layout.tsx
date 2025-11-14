import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - QR Menu SaaS",
  description: "Platform administration",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Base layout for all admin routes
  // Auth guard is applied only to dashboard routes
  return <>{children}</>
}
