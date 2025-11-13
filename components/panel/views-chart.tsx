'use client'

interface ViewsChartProps {
  data: Record<string, number>
}

export function ViewsChart({ data }: ViewsChartProps) {
  // Convert data to array and sort by date
  const chartData = Object.entries(data)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (chartData.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No data available for the selected period
      </div>
    )
  }

  // Find max value for scaling
  const maxCount = Math.max(...chartData.map(d => d.count))
  const chartHeight = 200

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="relative" style={{ height: chartHeight }}>
        <div className="absolute inset-0 flex items-end justify-between gap-1">
          {chartData.map(({ date, count }) => {
            const height = maxCount > 0 ? (count / maxCount) * 100 : 0
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })

            return (
              <div
                key={date}
                className="flex-1 flex flex-col items-center justify-end group relative"
              >
                {/* Bar */}
                <div
                  className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                  style={{ height: `${height}%`, minHeight: count > 0 ? '4px' : '0' }}
                />
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                  <div className="font-medium">{count} views</div>
                  <div className="text-gray-300">{formattedDate}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 -ml-12 flex flex-col justify-between text-xs text-muted-foreground">
          <span>{maxCount}</span>
          <span>{Math.round(maxCount / 2)}</span>
          <span>0</span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
        <span>
          {new Date(chartData[0].date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </span>
        {chartData.length > 2 && (
          <span>
            {new Date(chartData[Math.floor(chartData.length / 2)].date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        )}
        <span>
          {new Date(chartData[chartData.length - 1].date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  )
}
