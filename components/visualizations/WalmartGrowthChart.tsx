'use client'

import { useState, useEffect, useRef } from 'react'

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

// Key milestones
const milestones = [
  { year: 1962, label: 'First store opens in Arkansas' },
  { year: 1970, label: 'Goes public on NYSE' },
  { year: 1988, label: 'First Supercenter opens' },
  { year: 1991, label: 'Expands internationally' },
  { year: 2002, label: 'Becomes world\'s largest company' },
]

export default function WalmartGrowthChart() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
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
      const duration = 2000
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
  const padding = { top: 40, right: 30, bottom: 60, left: 70 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const minYear = 1962
  const maxYear = 2005
  const maxStores = 7000

  const xScale = (year: number) =>
    padding.left + ((year - minYear) / (maxYear - minYear)) * innerWidth

  const yScale = (stores: number) =>
    padding.top + innerHeight - (stores / maxStores) * innerHeight

  // Create area path
  const areaPath = walmartData
    .map((d, i) => {
      const x = xScale(d.year)
      const y = yScale(d.stores * animationProgress)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ') + ` L ${xScale(2005)} ${yScale(0)} L ${xScale(1962)} ${yScale(0)} Z`

  // Create line path
  const linePath = walmartData
    .map((d, i) => {
      const x = xScale(d.year)
      const y = yScale(d.stores * animationProgress)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  return (
    <div ref={chartRef} className="w-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        style={{ maxWidth: chartWidth }}
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="walmartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0071CE" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#0071CE" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        {/* Y-axis gridlines */}
        {[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000].map(value => (
          <g key={value}>
            <line
              x1={padding.left}
              y1={yScale(value)}
              x2={chartWidth - padding.right}
              y2={yScale(value)}
              stroke="#e5e5e5"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={yScale(value)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-neutral-400 text-xs"
            >
              {value.toLocaleString()}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {walmartData.filter((_, i) => i % 2 === 0).map(d => (
          <text
            key={d.year}
            x={xScale(d.year)}
            y={chartHeight - padding.bottom + 20}
            textAnchor="middle"
            className="fill-neutral-400 text-xs"
          >
            {d.year}
          </text>
        ))}

        {/* Area fill */}
        <path
          d={areaPath}
          fill="url(#walmartGradient)"
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#0071CE"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {walmartData.map((d, i) => {
          const isHovered = hoveredPoint === i
          return (
            <g
              key={d.year}
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={xScale(d.year)}
                cy={yScale(d.stores * animationProgress)}
                r={isHovered ? 8 : 5}
                fill="#0071CE"
                stroke="white"
                strokeWidth={2}
                className="transition-all duration-200"
              />
              {/* Tooltip on hover */}
              {isHovered && (
                <g>
                  <rect
                    x={xScale(d.year) - 50}
                    y={yScale(d.stores * animationProgress) - 45}
                    width={100}
                    height={35}
                    fill="white"
                    stroke="#0071CE"
                    strokeWidth={1}
                    rx={4}
                  />
                  <text
                    x={xScale(d.year)}
                    y={yScale(d.stores * animationProgress) - 30}
                    textAnchor="middle"
                    className="fill-primary-500 font-bold text-xs"
                  >
                    {d.year}
                  </text>
                  <text
                    x={xScale(d.year)}
                    y={yScale(d.stores * animationProgress) - 16}
                    textAnchor="middle"
                    className="fill-neutral-600 text-xs"
                  >
                    {d.stores.toLocaleString()} stores
                  </text>
                </g>
              )}
            </g>
          )
        })}

        {/* Title */}
        <text
          x={chartWidth / 2}
          y={20}
          textAnchor="middle"
          className="fill-primary-500 font-serif text-base font-semibold"
        >
          Growth of Walmart (1962-2005)
        </text>

        {/* Y-axis label */}
        <text
          x={-chartHeight / 2}
          y={20}
          transform="rotate(-90)"
          textAnchor="middle"
          className="fill-neutral-500 text-xs"
        >
          Number of Stores
        </text>
      </svg>

      {/* Legend / Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">1</div>
          <div className="text-sm text-neutral-600">Store in 1962</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">6,141</div>
          <div className="text-sm text-neutral-600">Stores in 2005</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">614,000%</div>
          <div className="text-sm text-neutral-600">Growth Rate</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">43</div>
          <div className="text-sm text-neutral-600">Years</div>
        </div>
      </div>

      {/* Milestones */}
      <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
        <h4 className="font-semibold text-primary-500 mb-3">Key Milestones</h4>
        <div className="space-y-2">
          {milestones.map(m => (
            <div key={m.year} className="flex items-center gap-3 text-sm">
              <span className="font-bold text-blue-600 w-12">{m.year}</span>
              <span className="text-neutral-600">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-neutral-700 text-sm">
          <strong>Exponential growth:</strong> From a single store in Rogers, Arkansas to the world&apos;s largest retailer,
          Walmart&apos;s expansion illustrates corporate consolidation&apos;s acceleration and the systematic displacement
          of small retailers across America.
        </p>
      </div>
    </div>
  )
}
