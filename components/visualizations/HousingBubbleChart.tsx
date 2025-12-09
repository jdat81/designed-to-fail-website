'use client'

import { useState, useEffect } from 'react'

// U.S. National Home Price Index data 2000-2010
const housingData = [
  { year: 2000, index: 227 },
  { year: 2001, index: 244 },
  { year: 2002, index: 260 },
  { year: 2003, index: 283 },
  { year: 2004, index: 320 },
  { year: 2005, index: 360 },
  { year: 2006, index: 370 },
  { year: 2007, index: 355 },
  { year: 2008, index: 295 },
  { year: 2009, index: 257 },
  { year: 2010, index: 250 },
]

export default function HousingBubbleChart() {
  const [animated, setAnimated] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const maxIndex = Math.max(...housingData.map(d => d.index))
  const minIndex = Math.min(...housingData.map(d => d.index))
  const range = maxIndex - minIndex

  // Find peak
  const peakYear = housingData.find(d => d.index === maxIndex)?.year

  return (
    <div className="w-full">
      {/* Title */}
      <h3 className="text-center text-lg font-serif font-semibold text-primary-500 mb-6">
        U.S. National Home Price Index (2000-2010)
      </h3>

      {/* Chart */}
      <div className="relative h-72 bg-gradient-to-b from-slate-50 to-white rounded-xl p-4">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-4 bottom-10 w-12 flex flex-col justify-between text-right pr-2">
          <span className="text-xs text-neutral-400">{maxIndex}</span>
          <span className="text-xs text-neutral-400">{Math.round((maxIndex + minIndex) / 2)}</span>
          <span className="text-xs text-neutral-400">{minIndex}</span>
        </div>

        {/* Crisis shading */}
        <div
          className="absolute top-4 bottom-10 bg-red-100/60 rounded"
          style={{
            left: 'calc(12px + 63.6%)',
            width: '27%'
          }}
        >
          <span className="text-xs text-red-600 font-bold absolute top-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
            Crisis
          </span>
        </div>

        {/* Line chart */}
        <div className="absolute left-14 right-4 top-4 bottom-10">
          <svg className="w-full h-full" viewBox="0 0 440 200" preserveAspectRatio="none">
            {/* Area under line */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 50, 100, 150, 200].map(y => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="440"
                y2={y}
                stroke="#e5e5e5"
                strokeDasharray="4 4"
              />
            ))}

            {/* Area path */}
            <path
              d={`
                M 0 ${200 - ((housingData[0].index - minIndex) / range) * 200 * (animated ? 1 : 0)}
                ${housingData.map((d, i) => {
                  const x = (i / (housingData.length - 1)) * 440
                  const y = 200 - ((d.index - minIndex) / range) * 200 * (animated ? 1 : 0)
                  return `L ${x} ${y}`
                }).join(' ')}
                L 440 200
                L 0 200
                Z
              `}
              fill="url(#areaGradient)"
              className="transition-all duration-1000"
            />

            {/* Line */}
            <path
              d={`
                M 0 ${200 - ((housingData[0].index - minIndex) / range) * 200 * (animated ? 1 : 0)}
                ${housingData.map((d, i) => {
                  const x = (i / (housingData.length - 1)) * 440
                  const y = 200 - ((d.index - minIndex) / range) * 200 * (animated ? 1 : 0)
                  return `L ${x} ${y}`
                }).join(' ')}
              `}
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-1000"
            />

            {/* Data points */}
            {housingData.map((d, i) => {
              const x = (i / (housingData.length - 1)) * 440
              const y = 200 - ((d.index - minIndex) / range) * 200 * (animated ? 1 : 0)
              const isHovered = hoveredIndex === i
              const isPeak = d.year === peakYear

              return (
                <g key={d.year}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 8 : isPeak ? 6 : 4}
                    fill={isPeak ? '#f97316' : '#ef4444'}
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                  {isPeak && animated && (
                    <text
                      x={x}
                      y={y - 15}
                      textAnchor="middle"
                      className="text-xs font-bold fill-orange-600"
                    >
                      Peak: {d.index}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-14 right-4 bottom-0 flex justify-between px-0">
          {housingData.filter((_, i) => i % 2 === 0).map(d => (
            <span key={d.year} className="text-xs text-neutral-400">{d.year}</span>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute px-3 py-2 bg-white border border-red-200 rounded-lg shadow-lg z-10"
            style={{
              left: `calc(3.5rem + ${(hoveredIndex / (housingData.length - 1)) * 100}% - 40px)`,
              top: '1rem'
            }}
          >
            <div className="font-bold text-red-600">{housingData[hoveredIndex].year}</div>
            <div className="text-sm text-neutral-600">Index: {housingData[hoveredIndex].index}</div>
          </div>
        )}
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-orange-50 rounded-xl p-4 text-center border-t-4 border-orange-500">
          <div className="text-2xl font-bold text-orange-600">+63%</div>
          <div className="text-sm text-neutral-600">Rise (2000-2006)</div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 text-center border-t-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">-32%</div>
          <div className="text-sm text-neutral-600">Crash (2006-2010)</div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 text-center border-t-4 border-red-600">
          <div className="text-2xl font-bold text-red-700">$5T</div>
          <div className="text-sm text-neutral-600">Equity Lost</div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 text-center border-t-4 border-red-700">
          <div className="text-2xl font-bold text-red-800">2.3M</div>
          <div className="text-sm text-neutral-600">Foreclosures</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-l-4 border-red-500">
        <p className="text-neutral-700 text-sm">
          <strong>Bubble and Bust:</strong> National home prices rose 63% from 2000 to their 2006 peak before collapsing 32%.
          The housing bubble was fueled by low interest rates, lax lending standards, and financial deregulation—
          culminating in the worst financial crisis since the Great Depression.
        </p>
      </div>
    </div>
  )
}
