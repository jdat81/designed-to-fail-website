'use client'

import { useState, useEffect, useRef } from 'react'

const incomeData = [
  { year: 1968, bottom20: 4.2, middle60: 52.3, top20: 43.5, top5: 17.4 },
  { year: 1978, bottom20: 4.3, middle60: 52.4, top20: 43.3, top5: 16.8 },
  { year: 1988, bottom20: 3.8, middle60: 49.7, top20: 46.5, top5: 18.3 },
  { year: 1998, bottom20: 3.6, middle60: 47.2, top20: 49.2, top5: 21.4 },
  { year: 2008, bottom20: 3.4, middle60: 45.8, top20: 50.8, top5: 21.5 },
  { year: 2018, bottom20: 3.1, middle60: 44.2, top20: 52.7, top5: 23.1 },
  { year: 2023, bottom20: 3.0, middle60: 43.5, top20: 53.5, top5: 24.2 },
]

const colors = {
  top5: '#dc2626',      // Vibrant red
  top20: '#f97316',     // Orange
  middle60: '#3b82f6',  // Blue
  bottom20: '#8b5cf6',  // Purple
}

export default function IncomeInequalityChart() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && animationProgress < 1) {
      const duration = 1500
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setAnimationProgress(eased)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [isVisible, animationProgress])

  const chartWidth = 700
  const chartHeight = 400
  const padding = { top: 50, right: 30, bottom: 70, left: 60 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const barWidth = innerWidth / incomeData.length - 20

  return (
    <div ref={chartRef} className="w-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        style={{ maxWidth: chartWidth }}
      >
        {/* Y-axis gridlines */}
        {[0, 20, 40, 60, 80, 100].map(value => (
          <g key={value}>
            <line
              x1={padding.left}
              y1={padding.top + innerHeight - (value / 100) * innerHeight}
              x2={chartWidth - padding.right}
              y2={padding.top + innerHeight - (value / 100) * innerHeight}
              stroke="#e5e5e5"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={padding.top + innerHeight - (value / 100) * innerHeight}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-neutral-400 text-xs"
            >
              {value}%
            </text>
          </g>
        ))}

        {/* Stacked bars */}
        {incomeData.map((d, i) => {
          const x = padding.left + (i / incomeData.length) * innerWidth + 10
          let y = padding.top + innerHeight

          const segments = [
            { key: 'bottom20', value: d.bottom20, color: colors.bottom20, label: 'Bottom 20%' },
            { key: 'middle60', value: d.middle60, color: colors.middle60, label: 'Middle 60%' },
            { key: 'top20', value: d.top20 - d.top5, color: colors.top20, label: 'Top 15-20%' },
            { key: 'top5', value: d.top5, color: colors.top5, label: 'Top 5%' },
          ]

          const isHovered = hoveredBar === i

          return (
            <g
              key={d.year}
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
              style={{ cursor: 'pointer' }}
            >
              {segments.map((seg) => {
                const height = (seg.value / 100) * innerHeight * animationProgress
                y -= height
                return (
                  <rect
                    key={seg.key}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={height}
                    fill={seg.color}
                    rx={2}
                    opacity={hoveredBar === null || isHovered ? 1 : 0.4}
                    className="transition-all duration-200"
                    style={{
                      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                      transformOrigin: 'center bottom',
                    }}
                  />
                )
              })}
              {/* Year label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - padding.bottom + 25}
                textAnchor="middle"
                className={`text-sm font-semibold transition-colors ${isHovered ? 'fill-primary-500' : 'fill-neutral-500'}`}
              >
                {d.year}
              </text>
            </g>
          )
        })}

        {/* Title */}
        <text
          x={chartWidth / 2}
          y={25}
          textAnchor="middle"
          className="fill-primary-500 font-serif text-base font-semibold"
        >
          Share of Total U.S. Household Income (1968-2023)
        </text>

        {/* Y-axis label */}
        <text
          x={-chartHeight / 2 + 20}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="fill-neutral-500 text-xs"
        >
          Percent of Total Income
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {[
          { key: 'top5', label: 'Top 5%', color: colors.top5 },
          { key: 'top20', label: 'Top 15-20%', color: colors.top20 },
          { key: 'middle60', label: 'Middle 60%', color: colors.middle60 },
          { key: 'bottom20', label: 'Bottom 20%', color: colors.bottom20 },
        ].map(item => (
          <div key={item.key} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-neutral-600 text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Hover details */}
      {hoveredBar !== null && (
        <div className="mt-4 p-5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
          <div className="font-bold text-xl text-primary-500 mb-3">{incomeData[hoveredBar].year}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.top5 }}>{incomeData[hoveredBar].top5}%</div>
              <div className="text-xs text-neutral-500">Top 5%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.top20 }}>{(incomeData[hoveredBar].top20 - incomeData[hoveredBar].top5).toFixed(1)}%</div>
              <div className="text-xs text-neutral-500">Top 15-20%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.middle60 }}>{incomeData[hoveredBar].middle60}%</div>
              <div className="text-xs text-neutral-500">Middle 60%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.bottom20 }}>{incomeData[hoveredBar].bottom20}%</div>
              <div className="text-xs text-neutral-500">Bottom 20%</div>
            </div>
          </div>
        </div>
      )}

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-red-50 rounded-lg p-4 text-center border-t-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">+39%</div>
          <div className="text-sm text-neutral-600">Top 5% Growth</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center border-t-4 border-orange-500">
          <div className="text-2xl font-bold text-orange-600">+23%</div>
          <div className="text-sm text-neutral-600">Top 20% Growth</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center border-t-4 border-blue-500">
          <div className="text-2xl font-bold text-blue-600">-17%</div>
          <div className="text-sm text-neutral-600">Middle 60% Decline</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center border-t-4 border-purple-500">
          <div className="text-2xl font-bold text-purple-600">-29%</div>
          <div className="text-sm text-neutral-600">Bottom 20% Decline</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
        <p className="text-neutral-700 text-sm">
          <strong>The Great Divergence:</strong> Since 1968, the top 5%&apos;s share of income grew from 17.4% to 24.2%,
          while the middle class share shrank from 52.3% to 43.5%. The American Dream of shared prosperity has
          given way to winner-take-all economics.
        </p>
      </div>
    </div>
  )
}
