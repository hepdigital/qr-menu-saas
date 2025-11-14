import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login - QR Menu SaaS",
  description: "Admin authentication",
}

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // No auth guard for login pages
  return <>{children}</>
}
