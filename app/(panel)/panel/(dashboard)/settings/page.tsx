import { getCurrentRestaurant } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SettingsForm } from '@/components/panel/settings-form'

export default async function SettingsPage() {
  const restaurant = await getCurrentRestaurant()

  if (!restaurant) {
    redirect('/panel/login')
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your restaurant settings, language, and contact information
        </p>
      </div>

      <SettingsForm restaurant={restaurant} />
    </div>
  )
}
