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
  top5: '#8B0000',
  top20: '#C9A227',
  middle60: '#1A1A2E',
  bottom20: '#6B7280',
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
  const chartHeight = 350
  const padding = { top: 30, right: 20, bottom: 60, left: 60 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const barWidth = innerWidth / incomeData.length - 10

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
          const x = padding.left + (i / incomeData.length) * innerWidth + 5
          let y = padding.top + innerHeight

          const segments = [
            { key: 'bottom20', value: d.bottom20, color: colors.bottom20 },
            { key: 'middle60', value: d.middle60, color: colors.middle60 },
            { key: 'top20', value: d.top20 - d.top5, color: colors.top20 },
            { key: 'top5', value: d.top5, color: colors.top5 },
          ]

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
                    opacity={hoveredBar === null || hoveredBar === i ? 1 : 0.5}
                    className="transition-opacity duration-200"
                  />
                )
              })}
              {/* Year label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                className="fill-neutral-500 text-xs"
              >
                {d.year}
              </text>
            </g>
          )
        })}

        {/* Title */}
        <text
          x={chartWidth / 2}
          y={15}
          textAnchor="middle"
          className="fill-primary-500 font-serif text-sm font-semibold"
        >
          Share of Total U.S. Household Income (1968-2023)
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded" style={{ backgroundColor: colors.top5 }}></span>
          <span className="text-neutral-600">Top 5%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded" style={{ backgroundColor: colors.top20 }}></span>
          <span className="text-neutral-600">Top 20% (excl. top 5%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded" style={{ backgroundColor: colors.middle60 }}></span>
          <span className="text-neutral-600">Middle 60%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded" style={{ backgroundColor: colors.bottom20 }}></span>
          <span className="text-neutral-600">Bottom 20%</span>
        </div>
      </div>

      {/* Hover tooltip */}
      {hoveredBar !== null && (
        <div className="mt-4 p-4 bg-neutral-50 rounded-lg text-sm">
          <div className="font-semibold text-primary-500 mb-2">{incomeData[hoveredBar].year}</div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-neutral-600">Top 5%:</span>
            <span className="font-semibold">{incomeData[hoveredBar].top5}%</span>
            <span className="text-neutral-600">Top 20%:</span>
            <span className="font-semibold">{incomeData[hoveredBar].top20}%</span>
            <span className="text-neutral-600">Middle 60%:</span>
            <span className="font-semibold">{incomeData[hoveredBar].middle60}%</span>
            <span className="text-neutral-600">Bottom 20%:</span>
            <span className="font-semibold">{incomeData[hoveredBar].bottom20}%</span>
          </div>
        </div>
      )}

      {/* Key insight */}
      <div className="mt-6 p-4 bg-secondary-500/10 rounded-lg border-l-4 border-secondary-500">
        <p className="text-neutral-700 text-sm">
          <strong>Growing concentration:</strong> The top 5% share grew from 17.4% in 1968 to 24.2% in 2023,
          while the middle 60% share declined from 52.3% to 43.5%.
        </p>
      </div>
    </div>
  )
}
