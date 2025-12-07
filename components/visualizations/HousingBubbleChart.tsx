'use client'

import { useState, useEffect, useRef } from 'react'

// U.S. National Home Price Index data 2000-2010 (approximated from the R code)
const housingData = [
  { year: 2000.0, index: 227 },
  { year: 2000.5, index: 232 },
  { year: 2001.0, index: 240 },
  { year: 2001.5, index: 248 },
  { year: 2002.0, index: 255 },
  { year: 2002.5, index: 265 },
  { year: 2003.0, index: 275 },
  { year: 2003.5, index: 290 },
  { year: 2004.0, index: 310 },
  { year: 2004.5, index: 330 },
  { year: 2005.0, index: 355 },
  { year: 2005.5, index: 365 },
  { year: 2006.0, index: 370 },
  { year: 2006.5, index: 365 },
  { year: 2007.0, index: 355 },
  { year: 2007.5, index: 340 },
  { year: 2008.0, index: 310 },
  { year: 2008.5, index: 280 },
  { year: 2009.0, index: 260 },
  { year: 2009.5, index: 255 },
  { year: 2010.0, index: 250 },
]

// Crisis periods
const crisisPeriods = [
  { start: 2000.25, end: 2002.75, label: 'Dot-Com Crisis', color: 'rgba(239, 68, 68, 0.15)' },
  { start: 2007.75, end: 2009.5, label: 'Financial Crisis', color: 'rgba(220, 38, 38, 0.25)' },
]

export default function HousingBubbleChart() {
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

  const chartWidth = 750
  const chartHeight = 420
  const padding = { top: 50, right: 40, bottom: 70, left: 80 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const minYear = 2000
  const maxYear = 2010
  const minIndex = 200
  const maxIndex = 400

  const xScale = (year: number) =>
    padding.left + ((year - minYear) / (maxYear - minYear)) * innerWidth

  const yScale = (index: number) =>
    padding.top + innerHeight - ((index - minIndex) / (maxIndex - minIndex)) * innerHeight

  // Create area path
  const areaPath = housingData
    .map((d, i) => {
      const x = xScale(d.year)
      const animatedIndex = minIndex + (d.index - minIndex) * animationProgress
      const y = yScale(animatedIndex)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ') + ` L ${xScale(2010)} ${yScale(minIndex)} L ${xScale(2000)} ${yScale(minIndex)} Z`

  // Create line path
  const linePath = housingData
    .map((d, i) => {
      const x = xScale(d.year)
      const animatedIndex = minIndex + (d.index - minIndex) * animationProgress
      const y = yScale(animatedIndex)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  // Find peak point
  const peakData = housingData.reduce((max, d) => d.index > max.index ? d : max, housingData[0])

  return (
    <div ref={chartRef} className="w-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        style={{ maxWidth: chartWidth }}
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="housingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#dc2626" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        {/* Crisis periods */}
        {crisisPeriods.map((period, i) => (
          <g key={i}>
            <rect
              x={xScale(period.start)}
              y={padding.top}
              width={xScale(period.end) - xScale(period.start)}
              height={innerHeight}
              fill={period.color}
            />
            <text
              x={xScale((period.start + period.end) / 2)}
              y={padding.top + 20}
              textAnchor="middle"
              className="fill-red-700 text-xs font-semibold"
            >
              {period.label}
            </text>
          </g>
        ))}

        {/* Y-axis gridlines */}
        {[200, 250, 300, 350, 400].map(value => (
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
              {value}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {[2000, 2002, 2004, 2006, 2008, 2010].map(year => (
          <text
            key={year}
            x={xScale(year)}
            y={chartHeight - padding.bottom + 25}
            textAnchor="middle"
            className="fill-neutral-400 text-xs"
          >
            {year}
          </text>
        ))}

        {/* Area fill */}
        <path
          d={areaPath}
          fill="url(#housingGradient)"
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#dc2626"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Peak annotation */}
        {animationProgress > 0.8 && (
          <g>
            <line
              x1={xScale(peakData.year)}
              y1={yScale(minIndex + (peakData.index - minIndex) * animationProgress)}
              x2={xScale(peakData.year)}
              y2={yScale(minIndex + (peakData.index - minIndex) * animationProgress) - 30}
              stroke="#dc2626"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text
              x={xScale(peakData.year)}
              y={yScale(minIndex + (peakData.index - minIndex) * animationProgress) - 35}
              textAnchor="middle"
              className="fill-red-600 text-xs font-bold"
            >
              Peak: 2006
            </text>
          </g>
        )}

        {/* Data points */}
        {housingData.filter((_, i) => i % 2 === 0).map((d, i) => {
          const isHovered = hoveredPoint === i
          const animatedIndex = minIndex + (d.index - minIndex) * animationProgress
          return (
            <g
              key={d.year}
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={xScale(d.year)}
                cy={yScale(animatedIndex)}
                r={isHovered ? 8 : 5}
                fill="#dc2626"
                stroke="white"
                strokeWidth={2}
                className="transition-all duration-200"
              />
              {isHovered && (
                <g>
                  <rect
                    x={xScale(d.year) - 55}
                    y={yScale(animatedIndex) - 45}
                    width={110}
                    height={35}
                    fill="white"
                    stroke="#dc2626"
                    strokeWidth={1}
                    rx={4}
                  />
                  <text
                    x={xScale(d.year)}
                    y={yScale(animatedIndex) - 30}
                    textAnchor="middle"
                    className="fill-red-600 font-bold text-xs"
                  >
                    {Math.floor(d.year)}
                  </text>
                  <text
                    x={xScale(d.year)}
                    y={yScale(animatedIndex) - 16}
                    textAnchor="middle"
                    className="fill-neutral-600 text-xs"
                  >
                    Index: {d.index}
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
          U.S. Home Price Index: The Housing Bubble (2000-2010)
        </text>

        {/* Y-axis label */}
        <text
          x={-chartHeight / 2}
          y={25}
          transform="rotate(-90)"
          textAnchor="middle"
          className="fill-neutral-500 text-xs"
        >
          Home Price Index (1980 Q1 = 100)
        </text>

        {/* X-axis label */}
        <text
          x={chartWidth / 2}
          y={chartHeight - 15}
          textAnchor="middle"
          className="fill-neutral-500 text-xs"
        >
          Year
        </text>
      </svg>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">57.7%</div>
          <div className="text-sm text-neutral-600">Peak Rise (2000-2006)</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">-36%</div>
          <div className="text-sm text-neutral-600">Crash (2006-2009)</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">$5T</div>
          <div className="text-sm text-neutral-600">Home Equity Lost</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">2.3M</div>
          <div className="text-sm text-neutral-600">Foreclosures (2008)</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
        <p className="text-neutral-700 text-sm">
          <strong>Bubble and Bust:</strong> National home prices rose 57.7% from 2000 to their 2006 peak before collapsing.
          The housing bubble was fueled by low interest rates, lax lending standards, and financial deregulation—
          culminating in the worst financial crisis since the Great Depression.
        </p>
      </div>
    </div>
  )
}
