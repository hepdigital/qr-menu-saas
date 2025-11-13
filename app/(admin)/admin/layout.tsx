import type { Metadata } from "next"
import { AdminAuthGuard } from '@/components/admin/admin-auth-guard'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export const metadata: Metadata = {
  title: "Admin Panel - QR Menu SaaS",
  description: "Platform administration dashboard",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  )
}
