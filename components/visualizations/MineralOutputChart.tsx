'use client'

import { useState, useEffect, useRef } from 'react'

// US Mineral Production data 1913 - percentage of world output
const mineralData = [
  { mineral: 'Natural Gas', percentage: 95, color: '#1e3a5f' },
  { mineral: 'Petroleum', percentage: 65, color: '#2563eb' },
  { mineral: 'Copper', percentage: 56, color: '#3b82f6' },
  { mineral: 'Phosphate', percentage: 43, color: '#60a5fa' },
  { mineral: 'Coal', percentage: 39, color: '#1e3a5f' },
  { mineral: 'Molybdenum', percentage: 38, color: '#2563eb' },
  { mineral: 'Zinc', percentage: 37, color: '#3b82f6' },
  { mineral: 'Bauxite', percentage: 37, color: '#60a5fa' },
  { mineral: 'Iron Ore', percentage: 36, color: '#1e3a5f' },
  { mineral: 'Lead', percentage: 34, color: '#2563eb' },
  { mineral: 'Silver', percentage: 30, color: '#3b82f6' },
  { mineral: 'Salt', percentage: 20, color: '#60a5fa' },
  { mineral: 'Gold', percentage: 20, color: '#1e3a5f' },
  { mineral: 'Tungsten', percentage: 17, color: '#2563eb' },
]

export default function MineralOutputChart() {
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
      { threshold: 0.2 }
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

  const chartWidth = 750
  const chartHeight = 520
  const padding = { top: 50, right: 60, bottom: 50, left: 110 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const barHeight = (innerHeight / mineralData.length) - 6
  const maxValue = 100

  const xScale = (value: number) => (value / maxValue) * innerWidth

  return (
    <div ref={chartRef} className="w-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        style={{ maxWidth: chartWidth }}
      >
        {/* Grid lines */}
        {[0, 20, 40, 60, 80, 100].map(value => (
          <g key={value}>
            <line
              x1={padding.left + xScale(value)}
              y1={padding.top}
              x2={padding.left + xScale(value)}
              y2={chartHeight - padding.bottom}
              stroke="#e5e5e5"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left + xScale(value)}
              y={chartHeight - padding.bottom + 25}
              textAnchor="middle"
              className="fill-neutral-400 text-xs"
            >
              {value}
            </text>
          </g>
        ))}

        {/* Bars */}
        {mineralData.map((d, i) => {
          const barWidth = xScale(d.percentage) * animationProgress
          const y = padding.top + i * (innerHeight / mineralData.length) + 3
          const isHovered = hoveredBar === i

          // Color based on percentage
          let barColor = '#3b82f6'
          if (d.percentage >= 50) barColor = '#1e3a5f'
          else if (d.percentage >= 35) barColor = '#2563eb'
          else if (d.percentage >= 25) barColor = '#60a5fa'
          else barColor = '#93c5fd'

          return (
            <g
              key={d.mineral}
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Label */}
              <text
                x={padding.left - 8}
                y={y + barHeight / 2}
                textAnchor="end"
                dominantBaseline="middle"
                className={`text-xs transition-all duration-200 ${
                  isHovered ? 'fill-primary-500 font-semibold' : 'fill-neutral-600'
                }`}
              >
                {d.mineral}
              </text>

              {/* Bar */}
              <rect
                x={padding.left}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={barColor}
                rx={3}
                className={`transition-opacity duration-200 ${
                  isHovered ? 'opacity-80' : ''
                }`}
              />

              {/* Percentage label */}
              {animationProgress > 0.5 && (
                <text
                  x={padding.left + barWidth + 8}
                  y={y + barHeight / 2}
                  dominantBaseline="middle"
                  className={`text-xs font-bold transition-all duration-200 ${
                    isHovered ? 'fill-primary-500' : 'fill-neutral-700'
                  }`}
                >
                  {d.percentage}%
                </text>
              )}

              {/* Hover tooltip */}
              {isHovered && (
                <g>
                  <rect
                    x={padding.left + barWidth + 45}
                    y={y + barHeight / 2 - 15}
                    width={150}
                    height={30}
                    fill="white"
                    stroke={barColor}
                    strokeWidth={1}
                    rx={4}
                    className="drop-shadow-md"
                  />
                  <text
                    x={padding.left + barWidth + 120}
                    y={y + barHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-neutral-700 text-xs"
                  >
                    {d.percentage}% of world output
                  </text>
                </g>
              )}
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
          US Mineral Production as % of World Output (1913)
        </text>

        {/* X-axis label */}
        <text
          x={padding.left + innerWidth / 2}
          y={chartHeight - 10}
          textAnchor="middle"
          className="fill-neutral-500 text-xs"
        >
          Percent of World Output
        </text>
      </svg>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">95%</div>
          <div className="text-sm text-neutral-600">Natural Gas</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">65%</div>
          <div className="text-sm text-neutral-600">Petroleum</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">56%</div>
          <div className="text-sm text-neutral-600">Copper</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">14</div>
          <div className="text-sm text-neutral-600">Key Minerals</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
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
