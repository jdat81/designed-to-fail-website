'use client'

import { useState, useEffect, useRef } from 'react'

const trustData = [
  { year: 1958, trust: 73 },
  { year: 1964, trust: 77 },
  { year: 1966, trust: 65 },
  { year: 1968, trust: 61 },
  { year: 1970, trust: 54 },
  { year: 1972, trust: 53 },
  { year: 1974, trust: 36 },
  { year: 1976, trust: 34 },
  { year: 1978, trust: 30 },
]

export default function TrustDeclineChart() {
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
  const padding = { top: 50, right: 40, bottom: 60, left: 60 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const minYear = 1958
  const maxYear = 1978
  const minTrust = 20
  const maxTrust = 85

  const xScale = (year: number) =>
    padding.left + ((year - minYear) / (maxYear - minYear)) * innerWidth

  const yScale = (trust: number) =>
    padding.top + innerHeight - ((trust - minTrust) / (maxTrust - minTrust)) * innerHeight

  // Create area path
  const areaPath = trustData
    .map((d, i) => {
      const x = xScale(d.year)
      const animatedTrust = minTrust + (d.trust - minTrust) * animationProgress
      const y = yScale(animatedTrust)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ') + ` L ${xScale(1978)} ${yScale(minTrust)} L ${xScale(1958)} ${yScale(minTrust)} Z`

  // Create line path
  const linePath = trustData
    .map((d, i) => {
      const x = xScale(d.year)
      const animatedTrust = minTrust + (d.trust - minTrust) * animationProgress
      const y = yScale(animatedTrust)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  // Key events
  const events = [
    { year: 1963, label: 'JFK Assassination', y: 70 },
    { year: 1968, label: 'MLK/RFK Killed', y: 58 },
    { year: 1974, label: 'Nixon Resigns', y: 33 },
  ]

  return (
    <div ref={chartRef} className="w-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        style={{ maxWidth: chartWidth }}
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="trustGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        {/* Y-axis gridlines */}
        {[20, 40, 60, 80].map(value => (
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
              x={padding.left - 12}
              y={yScale(value)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-neutral-400 text-xs"
            >
              {value}%
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {trustData.map(d => (
          <text
            key={d.year}
            x={xScale(d.year)}
            y={chartHeight - padding.bottom + 25}
            textAnchor="middle"
            className="fill-neutral-400 text-xs"
          >
            {d.year}
          </text>
        ))}

        {/* Event markers */}
        {events.map((event, i) => (
          <g key={i} style={{ opacity: animationProgress > 0.5 ? 1 : 0 }}>
            <line
              x1={xScale(event.year)}
              y1={yScale(event.y) - 5}
              x2={xScale(event.year)}
              y2={yScale(minTrust)}
              stroke="#f97316"
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.5}
            />
            <text
              x={xScale(event.year)}
              y={yScale(event.y) - 15}
              textAnchor="middle"
              className="fill-orange-500 text-[10px] font-semibold"
            >
              {event.label}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path
          d={areaPath}
          fill="url(#trustGradient)"
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#ef4444"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {trustData.map((d, i) => {
          const isHovered = hoveredPoint === i
          const animatedTrust = minTrust + (d.trust - minTrust) * animationProgress
          return (
            <g
              key={d.year}
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={xScale(d.year)}
                cy={yScale(animatedTrust)}
                r={isHovered ? 10 : 6}
                fill="#ef4444"
                stroke="white"
                strokeWidth={3}
                className="transition-all duration-200"
              />
              {/* Always show first and last labels */}
              {(i === 0 || i === trustData.length - 1 || isHovered) && (
                <g>
                  <rect
                    x={xScale(d.year) - 28}
                    y={yScale(animatedTrust) - 35}
                    width={56}
                    height={24}
                    fill="white"
                    stroke="#ef4444"
                    strokeWidth={1}
                    rx={4}
                  />
                  <text
                    x={xScale(d.year)}
                    y={yScale(animatedTrust) - 19}
                    textAnchor="middle"
                    className="fill-red-600 font-bold text-sm"
                  >
                    {Math.round(animatedTrust)}%
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
          The Collapse of Trust in Government (1958-1978)
        </text>

        {/* Y-axis label */}
        <text
          x={-chartHeight / 2}
          y={20}
          transform="rotate(-90)"
          textAnchor="middle"
          className="fill-neutral-500 text-xs"
        >
          % Trusting Government
        </text>
      </svg>

      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-600">73%</div>
          <div className="text-sm text-neutral-600">1958 Peak</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-600">30%</div>
          <div className="text-sm text-neutral-600">1978 Low</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-600">-43pts</div>
          <div className="text-sm text-neutral-600">Total Decline</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
        <p className="text-neutral-700 text-sm">
          <strong>A Generation of Disillusionment:</strong> Trust in government collapsed by 43 percentage points
          in just 20 years—driven by Vietnam, Watergate, assassinations, and civil unrest. This erosion of faith
          fundamentally reshaped American political culture and continues to shape our democracy today.
        </p>
      </div>
    </div>
  )
}
