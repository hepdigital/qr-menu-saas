import { AnalyticsDashboard } from '@/components/panel/analytics-dashboard'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track your menu views and customer engagement
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  )
}
