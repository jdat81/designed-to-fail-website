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
        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3)
        setAnimationProgress(eased)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [isVisible, animationProgress])

  const chartWidth = 600
  const chartHeight = 300
  const padding = { top: 20, right: 30, bottom: 40, left: 50 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const minYear = Math.min(...trustData.map(d => d.year))
  const maxYear = Math.max(...trustData.map(d => d.year))
  const minTrust = 20
  const maxTrust = 80

  const xScale = (year: number) =>
    padding.left + ((year - minYear) / (maxYear - minYear)) * innerWidth

  const yScale = (trust: number) =>
    padding.top + innerHeight - ((trust - minTrust) / (maxTrust - minTrust)) * innerHeight

  // Create line path
  const linePath = trustData
    .map((d, i) => {
      const x = xScale(d.year)
      const y = yScale(d.trust)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  // Calculate path length for animation
  const pathLength = 1000 // Approximate

  return (
    <div ref={chartRef} className="w-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        style={{ maxWidth: chartWidth }}
      >
        {/* Grid lines */}
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
              x={padding.left - 10}
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
        {trustData.filter((_, i) => i % 2 === 0).map(d => (
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

        {/* Animated line */}
        <path
          d={linePath}
          fill="none"
          stroke="#8B0000"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength * (1 - animationProgress)}
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />

        {/* Data points */}
        {trustData.map((d, i) => {
          const pointProgress = Math.max(0, (animationProgress * trustData.length - i) / 1)
          const opacity = Math.min(1, pointProgress)
          const scale = Math.min(1, pointProgress)

          return (
            <g key={d.year} style={{ opacity }}>
              <circle
                cx={xScale(d.year)}
                cy={yScale(d.trust)}
                r={6 * scale}
                fill="#8B0000"
                className="transition-all duration-200"
              />
              {/* Labels for first and last */}
              {(i === 0 || i === trustData.length - 1) && (
                <text
                  x={xScale(d.year)}
                  y={yScale(d.trust) - 15}
                  textAnchor="middle"
                  className="fill-primary-500 font-bold text-sm"
                  style={{ opacity: scale }}
                >
                  {d.trust}%
                </text>
              )}
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
          Trust in Government (1958-1978)
        </text>
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 bg-accent-red rounded"></span>
          <span className="text-neutral-600">% Trusting Government &quot;Most of the Time&quot;</span>
        </div>
      </div>

      {/* Annotation */}
      <div className="mt-6 p-4 bg-accent-red/5 rounded-lg border-l-4 border-accent-red">
        <p className="text-neutral-700 text-sm">
          <strong>-43 percentage points</strong> — Trust in government collapsed from 73% in 1958 to 30% in 1978,
          a dramatic shift that fundamentally changed American political culture.
        </p>
      </div>
    </div>
  )
}
