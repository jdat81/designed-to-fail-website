'use client'

import { useState, useEffect } from 'react'

// Walmart store count data 1962-2005
const walmartData = [
  { year: 1962, stores: 1 },
  { year: 1967, stores: 24 },
  { year: 1970, stores: 32 },
  { year: 1972, stores: 51 },
  { year: 1975, stores: 125 },
  { year: 1980, stores: 276 },
  { year: 1985, stores: 882 },
  { year: 1990, stores: 1528 },
  { year: 1995, stores: 2943 },
  { year: 2000, stores: 4189 },
  { year: 2005, stores: 6141 },
]

const milestones = [
  { year: 1962, event: 'First store opens in Rogers, Arkansas' },
  { year: 1970, event: 'Goes public on NYSE' },
  { year: 1988, event: 'First Supercenter opens' },
  { year: 1991, event: 'Expands internationally' },
  { year: 2002, event: 'Becomes world\'s largest company' },
]

export default function WalmartGrowthChart() {
  const [animated, setAnimated] = useState(false)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const maxStores = Math.max(...walmartData.map(d => d.stores))

  return (
    <div className="w-full">
      {/* Title */}
      <h3 className="text-center text-lg font-serif font-semibold text-primary-500 mb-6">
        Growth of Walmart (1962-2005)
      </h3>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-2 h-64 px-4">
        {walmartData.map((item, index) => {
          const heightPercent = (item.stores / maxStores) * 100
          const isHovered = hoveredYear === item.year

          return (
            <div
              key={item.year}
              className="flex-1 flex flex-col items-center"
              onMouseEnter={() => setHoveredYear(item.year)}
              onMouseLeave={() => setHoveredYear(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="mb-2 px-2 py-1 bg-blue-600 text-white text-xs rounded shadow-lg whitespace-nowrap">
                  {item.stores.toLocaleString()} stores
                </div>
              )}

              {/* Bar */}
              <div
                className="w-full rounded-t-lg transition-all duration-700 ease-out cursor-pointer"
                style={{
                  height: animated ? `${heightPercent}%` : '0%',
                  backgroundColor: isHovered ? '#1d4ed8' : '#3b82f6',
                  transitionDelay: `${index * 80}ms`,
                  minHeight: animated ? '4px' : '0px',
                }}
              />

              {/* Year label */}
              <div className="mt-2 text-xs text-neutral-500 transform -rotate-45 origin-top-left">
                {item.year}
              </div>
            </div>
          )
        })}
      </div>

      {/* Y-axis reference */}
      <div className="flex justify-end mt-4 pr-4">
        <span className="text-xs text-neutral-400">Max: {maxStores.toLocaleString()} stores</span>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-blue-50 rounded-xl p-4 text-center border-t-4 border-blue-500">
          <div className="text-3xl font-bold text-blue-600">1</div>
          <div className="text-sm text-neutral-600">Store in 1962</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center border-t-4 border-blue-600">
          <div className="text-3xl font-bold text-blue-700">6,141</div>
          <div className="text-sm text-neutral-600">Stores in 2005</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center border-t-4 border-blue-700">
          <div className="text-2xl font-bold text-blue-800">614,000%</div>
          <div className="text-sm text-neutral-600">Growth Rate</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center border-t-4 border-blue-800">
          <div className="text-3xl font-bold text-blue-900">43</div>
          <div className="text-sm text-neutral-600">Years</div>
        </div>
      </div>

      {/* Milestones */}
      <div className="mt-8 bg-neutral-50 rounded-xl p-6">
        <h4 className="font-semibold text-primary-500 mb-4">Key Milestones</h4>
        <div className="space-y-3">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="font-bold text-blue-600 text-lg w-16 shrink-0">{m.year}</span>
              <span className="text-neutral-600">{m.event}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-neutral-700 text-sm">
          <strong>Exponential Growth:</strong> From a single store in Rogers, Arkansas to the world&apos;s largest retailer,
          Walmart&apos;s expansion illustrates corporate consolidation&apos;s acceleration and the systematic displacement
          of small retailers across America.
        </p>
      </div>
    </div>
  )
}
