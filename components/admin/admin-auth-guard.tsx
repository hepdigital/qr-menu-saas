import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/auth'

export async function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const isAdminUser = await isAdmin()

  if (!isAdminUser) {
    redirect('/admin/login')
  }

  return <>{children}</>
}
