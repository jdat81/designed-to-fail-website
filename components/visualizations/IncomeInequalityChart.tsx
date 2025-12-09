'use client'

import { useState, useEffect } from 'react'

// Mean household income by quintile (in 2023 dollars, thousands)
const incomeData = [
  { year: 1968, lowest: 15.1, second: 37.2, third: 58.4, fourth: 83.2, highest: 151.8, top5: 236.4 },
  { year: 1978, lowest: 16.2, second: 40.5, third: 64.2, fourth: 92.1, highest: 168.3, top5: 259.8 },
  { year: 1988, lowest: 15.8, second: 39.9, third: 64.8, fourth: 96.5, highest: 192.4, top5: 315.2 },
  { year: 1998, lowest: 16.5, second: 41.2, third: 68.3, fourth: 105.8, highest: 234.1, top5: 401.6 },
  { year: 2008, lowest: 14.9, second: 38.4, third: 63.4, fourth: 101.7, highest: 244.3, top5: 422.5 },
  { year: 2018, lowest: 15.3, second: 40.1, third: 68.9, fourth: 112.3, highest: 280.4, top5: 497.1 },
  { year: 2023, lowest: 16.0, second: 41.8, third: 72.4, fourth: 119.2, highest: 302.5, top5: 542.8 },
]

const colors = {
  top5: '#dc2626',      // Vibrant red
  highest: '#f97316',   // Orange
  fourth: '#eab308',    // Yellow
  third: '#22c55e',     // Green
  second: '#3b82f6',    // Blue
  lowest: '#8b5cf6',    // Purple
}

export default function IncomeInequalityChart() {
  const [animated, setAnimated] = useState(false)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const chartWidth = 700
  const chartHeight = 420
  const padding = { top: 50, right: 80, bottom: 60, left: 70 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  // Scale: max value is ~550k for top 5%
  const maxValue = 600
  const minYear = 1968
  const maxYear = 2023

  const getX = (year: number) => padding.left + ((year - minYear) / (maxYear - minYear)) * innerWidth
  const getY = (value: number) => padding.top + innerHeight - (value / maxValue) * innerHeight * (animated ? 1 : 0)

  const lines = [
    { key: 'top5', label: 'Top 5%', color: colors.top5 },
    { key: 'highest', label: 'Highest 20%', color: colors.highest },
    { key: 'fourth', label: 'Fourth 20%', color: colors.fourth },
    { key: 'third', label: 'Third 20%', color: colors.third },
    { key: 'second', label: 'Second 20%', color: colors.second },
    { key: 'lowest', label: 'Lowest 20%', color: colors.lowest },
  ]

  const hoveredData = hoveredYear !== null ? incomeData.find(d => d.year === hoveredYear) : null

  return (
    <div className="w-full">
      {/* Title */}
      <h3 className="text-center text-lg font-serif font-semibold text-primary-500 mb-4">
        Mean Household Income by Quintile (1968-2023)
      </h3>
      <p className="text-center text-sm text-neutral-500 mb-6">In 2023 dollars (thousands)</p>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxWidth: chartWidth }}
      >
        {/* Y-axis gridlines */}
        {[0, 100, 200, 300, 400, 500, 600].map(value => (
          <g key={value}>
            <line
              x1={padding.left}
              y1={padding.top + innerHeight - (value / maxValue) * innerHeight}
              x2={chartWidth - padding.right}
              y2={padding.top + innerHeight - (value / maxValue) * innerHeight}
              stroke="#e5e5e5"
              strokeDasharray={value === 0 ? "0" : "4 4"}
            />
            <text
              x={padding.left - 10}
              y={padding.top + innerHeight - (value / maxValue) * innerHeight}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-neutral-400 text-xs"
            >
              ${value}k
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {incomeData.map(d => (
          <text
            key={d.year}
            x={getX(d.year)}
            y={chartHeight - padding.bottom + 25}
            textAnchor="middle"
            className="fill-neutral-500 text-xs"
          >
            {d.year}
          </text>
        ))}

        {/* Lines for each quintile */}
        {lines.map(line => {
          const pathData = incomeData.map((d, i) => {
            const x = getX(d.year)
            const y = getY(d[line.key as keyof typeof d] as number)
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
          }).join(' ')

          return (
            <g key={line.key}>
              <path
                d={pathData}
                fill="none"
                stroke={line.color}
                strokeWidth={line.key === 'top5' ? 4 : 3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-1000"
              />
              {/* Data points */}
              {incomeData.map(d => {
                const x = getX(d.year)
                const y = getY(d[line.key as keyof typeof d] as number)
                const isHovered = hoveredYear === d.year
                return (
                  <circle
                    key={`${line.key}-${d.year}`}
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 4}
                    fill={line.color}
                    stroke="white"
                    strokeWidth={2}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredYear(d.year)}
                    onMouseLeave={() => setHoveredYear(null)}
                  />
                )
              })}
              {/* End label */}
              <text
                x={chartWidth - padding.right + 8}
                y={getY(incomeData[incomeData.length - 1][line.key as keyof typeof incomeData[0]] as number)}
                dominantBaseline="middle"
                className="text-xs font-semibold"
                fill={line.color}
              >
                {line.label}
              </text>
            </g>
          )
        })}

        {/* Vertical hover line */}
        {hoveredYear !== null && (
          <line
            x1={getX(hoveredYear)}
            y1={padding.top}
            x2={getX(hoveredYear)}
            y2={padding.top + innerHeight}
            stroke="#94a3b8"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        )}

        {/* Y-axis label */}
        <text
          x={-chartHeight / 2 + 20}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="fill-neutral-500 text-xs"
        >
          Mean Household Income (2023 $)
        </text>
      </svg>

      {/* Hover details */}
      {hoveredData && (
        <div className="mt-4 p-5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
          <div className="font-bold text-xl text-primary-500 mb-3">{hoveredData.year}</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {lines.map(line => (
              <div key={line.key} className="text-center">
                <div className="text-lg font-bold" style={{ color: line.color }}>
                  ${(hoveredData[line.key as keyof typeof hoveredData] as number).toFixed(0)}k
                </div>
                <div className="text-xs text-neutral-500">{line.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-red-50 rounded-lg p-4 text-center border-t-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">+130%</div>
          <div className="text-sm text-neutral-600">Top 5% Growth</div>
          <div className="text-xs text-neutral-400">$236k → $543k</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center border-t-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">+24%</div>
          <div className="text-sm text-neutral-600">Middle 20% Growth</div>
          <div className="text-xs text-neutral-400">$58k → $72k</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center border-t-4 border-purple-500">
          <div className="text-2xl font-bold text-purple-600">+6%</div>
          <div className="text-sm text-neutral-600">Lowest 20% Growth</div>
          <div className="text-xs text-neutral-400">$15k → $16k</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
        <p className="text-neutral-700 text-sm">
          <strong>The Great Divergence:</strong> Since 1968, mean income for the top 5% grew by $306,000 (130%)
          while the lowest quintile gained just $900 (6%). The gap between top and bottom expanded from
          16:1 to 34:1—a visualization of how economic growth has been captured almost entirely by the wealthy.
        </p>
      </div>
    </div>
  )
}
