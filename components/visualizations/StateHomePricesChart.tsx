'use client'

import { useState, useEffect, useRef } from 'react'

// Top 5 states by home price appreciation 2000-2005
// Data based on FHFA All-Transactions House Price Index
const stateData = [
  {
    state: 'Nevada',
    abbrev: 'NV',
    color: '#dc2626',
    data: [
      { year: 2000, index: 256 },
      { year: 2001, index: 285 },
      { year: 2002, index: 320 },
      { year: 2003, index: 380 },
      { year: 2004, index: 490 },
      { year: 2005, index: 620 },
      { year: 2006, index: 650 },
      { year: 2007, index: 580 },
      { year: 2008, index: 420 },
      { year: 2009, index: 310 },
      { year: 2010, index: 275 },
    ],
    increase: 142.2,
  },
  {
    state: 'Arizona',
    abbrev: 'AZ',
    color: '#ea580c',
    data: [
      { year: 2000, index: 220 },
      { year: 2001, index: 240 },
      { year: 2002, index: 265 },
      { year: 2003, index: 305 },
      { year: 2004, index: 380 },
      { year: 2005, index: 485 },
      { year: 2006, index: 520 },
      { year: 2007, index: 475 },
      { year: 2008, index: 360 },
      { year: 2009, index: 280 },
      { year: 2010, index: 255 },
    ],
    increase: 120.5,
  },
  {
    state: 'Florida',
    abbrev: 'FL',
    color: '#f59e0b',
    data: [
      { year: 2000, index: 240 },
      { year: 2001, index: 265 },
      { year: 2002, index: 300 },
      { year: 2003, index: 355 },
      { year: 2004, index: 445 },
      { year: 2005, index: 560 },
      { year: 2006, index: 590 },
      { year: 2007, index: 535 },
      { year: 2008, index: 420 },
      { year: 2009, index: 350 },
      { year: 2010, index: 320 },
    ],
    increase: 133.3,
  },
  {
    state: 'California',
    abbrev: 'CA',
    color: '#84cc16',
    data: [
      { year: 2000, index: 280 },
      { year: 2001, index: 315 },
      { year: 2002, index: 365 },
      { year: 2003, index: 430 },
      { year: 2004, index: 530 },
      { year: 2005, index: 640 },
      { year: 2006, index: 660 },
      { year: 2007, index: 610 },
      { year: 2008, index: 480 },
      { year: 2009, index: 390 },
      { year: 2010, index: 370 },
    ],
    increase: 128.6,
  },
  {
    state: 'Hawaii',
    abbrev: 'HI',
    color: '#06b6d4',
    data: [
      { year: 2000, index: 295 },
      { year: 2001, index: 320 },
      { year: 2002, index: 365 },
      { year: 2003, index: 430 },
      { year: 2004, index: 520 },
      { year: 2005, index: 620 },
      { year: 2006, index: 660 },
      { year: 2007, index: 650 },
      { year: 2008, index: 580 },
      { year: 2009, index: 530 },
      { year: 2010, index: 510 },
    ],
    increase: 110.2,
  },
]

// National average for comparison
const nationalData = [
  { year: 2000, index: 230 },
  { year: 2001, index: 253 },
  { year: 2002, index: 269 },
  { year: 2003, index: 286 },
  { year: 2004, index: 313 },
  { year: 2005, index: 348 },
  { year: 2006, index: 373 },
  { year: 2007, index: 378 },
  { year: 2008, index: 358 },
  { year: 2009, index: 338 },
  { year: 2010, index: 324 },
]

export default function StateHomePricesChart() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [selectedStates, setSelectedStates] = useState<string[]>(stateData.map(s => s.state))
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

  const toggleState = (state: string) => {
    setSelectedStates(prev =>
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    )
  }

  const chartWidth = 750
  const chartHeight = 450
  const padding = { top: 50, right: 120, bottom: 60, left: 70 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const minYear = 2000
  const maxYear = 2010
  const minIndex = 200
  const maxIndex = 700

  const xScale = (year: number) =>
    padding.left + ((year - minYear) / (maxYear - minYear)) * innerWidth

  const yScale = (index: number) =>
    padding.top + innerHeight - ((index - minIndex) / (maxIndex - minIndex)) * innerHeight

  const createPath = (data: { year: number; index: number }[]) => {
    return data
      .map((d, i) => {
        const x = xScale(d.year)
        const animatedIndex = minIndex + (d.index - minIndex) * animationProgress
        const y = yScale(animatedIndex)
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')
  }

  return (
    <div ref={chartRef} className="w-full">
      {/* State toggles */}
      <div className="flex flex-wrap gap-2 mb-4">
        {stateData.map(s => (
          <button
            key={s.state}
            onClick={() => toggleState(s.state)}
            onMouseEnter={() => setHoveredState(s.state)}
            onMouseLeave={() => setHoveredState(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
              selectedStates.includes(s.state)
                ? 'text-white'
                : 'bg-neutral-100 text-neutral-400'
            }`}
            style={{
              backgroundColor: selectedStates.includes(s.state) ? s.color : undefined,
            }}
          >
            {s.abbrev} {s.increase.toFixed(0)}%
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        style={{ maxWidth: chartWidth }}
      >
        {/* Crisis period shading */}
        <rect
          x={xScale(2007)}
          y={padding.top}
          width={xScale(2010) - xScale(2007)}
          height={innerHeight}
          fill="rgba(220, 38, 38, 0.1)"
        />
        <text
          x={xScale(2008.5)}
          y={padding.top + 20}
          textAnchor="middle"
          className="fill-red-600 text-xs font-semibold"
        >
          Financial Crisis
        </text>

        {/* Y-axis gridlines */}
        {[200, 300, 400, 500, 600, 700].map(value => (
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

        {/* National average line (dashed) */}
        <path
          d={createPath(nationalData)}
          fill="none"
          stroke="#9ca3af"
          strokeWidth={2}
          strokeDasharray="6 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* State lines */}
        {stateData.map(s => {
          if (!selectedStates.includes(s.state)) return null
          const isHovered = hoveredState === s.state
          return (
            <g
              key={s.state}
              onMouseEnter={() => setHoveredState(s.state)}
              onMouseLeave={() => setHoveredState(null)}
            >
              <path
                d={createPath(s.data)}
                fill="none"
                stroke={s.color}
                strokeWidth={isHovered ? 4 : 2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-200"
                style={{ opacity: hoveredState && !isHovered ? 0.3 : 1 }}
              />
              {/* Data points */}
              {s.data.map(d => {
                const animatedIndex = minIndex + (d.index - minIndex) * animationProgress
                return (
                  <circle
                    key={d.year}
                    cx={xScale(d.year)}
                    cy={yScale(animatedIndex)}
                    r={isHovered ? 5 : 3}
                    fill={s.color}
                    stroke="white"
                    strokeWidth={1.5}
                    className="transition-all duration-200"
                    style={{ opacity: hoveredState && !isHovered ? 0.3 : 1 }}
                  />
                )
              })}
            </g>
          )
        })}

        {/* Legend */}
        <g transform={`translate(${chartWidth - padding.right + 15}, ${padding.top + 40})`}>
          {stateData.map((s, i) => (
            <g
              key={s.state}
              transform={`translate(0, ${i * 22})`}
              onMouseEnter={() => setHoveredState(s.state)}
              onMouseLeave={() => setHoveredState(null)}
              style={{ cursor: 'pointer', opacity: selectedStates.includes(s.state) ? 1 : 0.4 }}
            >
              <line
                x1={0}
                y1={0}
                x2={20}
                y2={0}
                stroke={s.color}
                strokeWidth={2.5}
              />
              <text
                x={25}
                y={0}
                dominantBaseline="middle"
                className="fill-neutral-600 text-xs"
              >
                {s.abbrev}
              </text>
            </g>
          ))}
          <g transform={`translate(0, ${stateData.length * 22 + 10})`}>
            <line
              x1={0}
              y1={0}
              x2={20}
              y2={0}
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="4 3"
            />
            <text
              x={25}
              y={0}
              dominantBaseline="middle"
              className="fill-neutral-500 text-xs"
            >
              National
            </text>
          </g>
        </g>

        {/* Title */}
        <text
          x={chartWidth / 2}
          y={25}
          textAnchor="middle"
          className="fill-primary-500 font-serif text-base font-semibold"
        >
          Top 5 States: Home Price Appreciation (2000-2010)
        </text>

        {/* Y-axis label */}
        <text
          x={-chartHeight / 2 + 20}
          y={22}
          transform="rotate(-90)"
          textAnchor="middle"
          className="fill-neutral-500 text-xs"
        >
          Home Price Index (1980 Q1 = 100)
        </text>
      </svg>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
        {stateData.map(s => (
          <div
            key={s.state}
            className="rounded-lg p-3 text-center transition-all duration-200"
            style={{
              backgroundColor: `${s.color}15`,
              borderLeft: `4px solid ${s.color}`,
            }}
            onMouseEnter={() => setHoveredState(s.state)}
            onMouseLeave={() => setHoveredState(null)}
          >
            <div className="text-xl font-bold" style={{ color: s.color }}>
              +{s.increase.toFixed(0)}%
            </div>
            <div className="text-xs text-neutral-600">{s.state}</div>
          </div>
        ))}
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
        <p className="text-neutral-700 text-sm">
          <strong>Bubble Geography:</strong> The housing bubble hit hardest in the &quot;sand states&quot;—Nevada, Arizona, Florida, and California.
          Nevada led with a staggering 142% price increase from 2000-2005, only to see prices crash over 55% by 2010.
          These states experienced both the most dramatic gains and the most devastating losses, with millions of homeowners left underwater on their mortgages.
        </p>
      </div>
    </div>
  )
}
