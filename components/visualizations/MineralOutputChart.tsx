'use client'

import { useState, useEffect } from 'react'

// US Mineral Production data 1913 - percentage of world output
const mineralData = [
  { mineral: 'Natural Gas', percentage: 95 },
  { mineral: 'Petroleum', percentage: 65 },
  { mineral: 'Copper', percentage: 56 },
  { mineral: 'Phosphate', percentage: 43 },
  { mineral: 'Coal', percentage: 39 },
  { mineral: 'Molybdenum', percentage: 38 },
  { mineral: 'Zinc', percentage: 37 },
  { mineral: 'Bauxite', percentage: 37 },
  { mineral: 'Iron Ore', percentage: 36 },
  { mineral: 'Lead', percentage: 34 },
  { mineral: 'Silver', percentage: 30 },
  { mineral: 'Salt', percentage: 20 },
  { mineral: 'Gold', percentage: 20 },
  { mineral: 'Tungsten', percentage: 17 },
]

function getBarColor(percentage: number): string {
  if (percentage >= 60) return '#dc2626' // red
  if (percentage >= 40) return '#f97316' // orange
  if (percentage >= 30) return '#eab308' // yellow
  return '#22c55e' // green
}

export default function MineralOutputChart() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    // Start animation after a small delay
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full">
      {/* Title */}
      <h3 className="text-center text-lg font-serif font-semibold text-primary-500 mb-6">
        US Mineral Production as % of World Output (1913)
      </h3>

      {/* Bars */}
      <div className="space-y-3">
        {mineralData.map((item, index) => (
          <div key={item.mineral} className="flex items-center gap-4">
            {/* Label */}
            <div className="w-28 text-right text-sm font-medium text-neutral-700 shrink-0">
              {item.mineral}
            </div>

            {/* Bar container */}
            <div className="flex-1 h-8 bg-neutral-100 rounded-lg overflow-hidden relative">
              {/* Animated bar */}
              <div
                className="h-full rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{
                  width: animated ? `${item.percentage}%` : '0%',
                  backgroundColor: getBarColor(item.percentage),
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {animated && item.percentage > 15 && (
                  <span className="text-white text-sm font-bold">
                    {item.percentage}%
                  </span>
                )}
              </div>

              {/* Percentage label for small bars */}
              {animated && item.percentage <= 15 && (
                <span
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold"
                  style={{ color: getBarColor(item.percentage) }}
                >
                  {item.percentage}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="flex items-center gap-4 mt-4">
        <div className="w-28 shrink-0" />
        <div className="flex-1 flex justify-between text-xs text-neutral-400 px-1">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-red-50 rounded-xl p-4 text-center border-l-4 border-red-500">
          <div className="text-3xl font-bold text-red-600">95%</div>
          <div className="text-sm text-neutral-600">Natural Gas</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center border-l-4 border-orange-500">
          <div className="text-3xl font-bold text-orange-600">65%</div>
          <div className="text-sm text-neutral-600">Petroleum</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center border-l-4 border-orange-500">
          <div className="text-3xl font-bold text-orange-600">56%</div>
          <div className="text-sm text-neutral-600">Copper</div>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 text-center border-l-4 border-yellow-500">
          <div className="text-3xl font-bold text-yellow-600">14</div>
          <div className="text-sm text-neutral-600">Key Minerals</div>
        </div>
      </div>

      {/* Color Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-red-500" />
          <span className="text-neutral-600">60%+ of world output</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-orange-500" />
          <span className="text-neutral-600">40-59%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-yellow-500" />
          <span className="text-neutral-600">30-39%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-green-500" />
          <span className="text-neutral-600">&lt;30%</span>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
        <p className="text-neutral-700 text-sm">
          <strong>Resource Dominance:</strong> By 1913, the United States had become the world&apos;s leading producer
          of virtually every basic mineral required for industrial advancement. This extraordinary resource wealth—
          producing 95% of the world&apos;s natural gas, 65% of petroleum, and over a third of essential industrial
          metals—provided the foundation for American industrial supremacy.
        </p>
      </div>
    </div>
  )
}
