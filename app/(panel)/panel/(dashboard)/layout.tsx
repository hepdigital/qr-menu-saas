import { redirect } from 'next/navigation'
import { getCurrentRestaurant } from '@/lib/auth'
import { Sidebar } from '@/components/panel/sidebar'
import { Header } from '@/components/panel/header'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const restaurant = await getCurrentRestaurant()

  // Redirect to login if not authenticated
  if (!restaurant) {
    redirect('/panel/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header restaurant={restaurant} />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
