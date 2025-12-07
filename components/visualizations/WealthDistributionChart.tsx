'use client'

import { useState, useEffect, useRef } from 'react'

// Wealth distribution data Q1 2025 from the R code
const wealthData = [
  { category: 'Top 1%', value: 28.0, color: '#1e3a5f' },
  { category: 'Next 9%\n(90th-99th)', value: 34.6, color: '#2563eb' },
  { category: 'Next 40%\n(50th-90th)', value: 31.8, color: '#60a5fa' },
  { category: 'Bottom 50%', value: 5.6, color: '#93c5fd' },
]

// Income share data 1970-2022 from the R code
const incomeShareData = [
  { year: 1970, lower: 10, middle: 62, upper: 29 },
  { year: 1979, lower: 9, middle: 60, upper: 30 },
  { year: 1989, lower: 8, middle: 54, upper: 38 },
  { year: 1999, lower: 8, middle: 49, upper: 43 },
  { year: 2009, lower: 9, middle: 45, upper: 46 },
  { year: 2022, lower: 8, middle: 43, upper: 48 },
]

export default function WealthDistributionChart() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [activeTab, setActiveTab] = useState<'wealth' | 'income'>('wealth')
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

  // Wealth Distribution Bar Chart
  const renderWealthChart = () => {
    const chartWidth = 700
    const chartHeight = 380
    const padding = { top: 50, right: 30, bottom: 100, left: 60 }
    const innerWidth = chartWidth - padding.left - padding.right
    const innerHeight = chartHeight - padding.top - padding.bottom

    const barWidth = innerWidth / wealthData.length - 30
    const maxValue = 40

    return (
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        style={{ maxWidth: chartWidth }}
      >
        {/* Y-axis gridlines */}
        {[0, 10, 20, 30, 40].map(value => (
          <g key={value}>
            <line
              x1={padding.left}
              y1={padding.top + innerHeight - (value / maxValue) * innerHeight}
              x2={chartWidth - padding.right}
              y2={padding.top + innerHeight - (value / maxValue) * innerHeight}
              stroke="#e5e5e5"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={padding.top + innerHeight - (value / maxValue) * innerHeight}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-neutral-400 text-xs"
            >
              {value}%
            </text>
          </g>
        ))}

        {/* Bars */}
        {wealthData.map((d, i) => {
          const barHeight = (d.value / maxValue) * innerHeight * animationProgress
          const x = padding.left + i * (innerWidth / wealthData.length) + 15
          const y = padding.top + innerHeight - barHeight
          const isHovered = hoveredBar === i

          return (
            <g
              key={d.category}
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={d.color}
                rx={4}
                className={`transition-all duration-200 ${isHovered ? 'opacity-80' : ''}`}
              />
              {/* Value label */}
              {animationProgress > 0.5 && (
                <text
                  x={x + barWidth / 2}
                  y={y - 10}
                  textAnchor="middle"
                  className="fill-primary-500 font-bold text-sm"
                >
                  {d.value}%
                </text>
              )}
              {/* Category label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                className="fill-neutral-600 text-xs"
              >
                {d.category.split('\n').map((line, j) => (
                  <tspan key={j} x={x + barWidth / 2} dy={j === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
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
          Distribution of U.S. Household Wealth (Q1 2025)
        </text>

        {/* Y-axis label */}
        <text
          x={-chartHeight / 2 + 30}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="fill-neutral-500 text-xs"
        >
          Share of Total Net Worth
        </text>
      </svg>
    )
  }

  // Income Share Line Chart
  const renderIncomeChart = () => {
    const chartWidth = 700
    const chartHeight = 380
    const padding = { top: 50, right: 120, bottom: 60, left: 60 }
    const innerWidth = chartWidth - padding.left - padding.right
    const innerHeight = chartHeight - padding.top - padding.bottom

    const minYear = 1970
    const maxYear = 2022
    const maxValue = 70

    const xScale = (year: number) =>
      padding.left + ((year - minYear) / (maxYear - minYear)) * innerWidth

    const yScale = (value: number) =>
      padding.top + innerHeight - (value / maxValue) * innerHeight

    const createPath = (key: 'lower' | 'middle' | 'upper') => {
      return incomeShareData
        .map((d, i) => {
          const x = xScale(d.year)
          const y = yScale(d[key] * animationProgress)
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        })
        .join(' ')
    }

    const lineStyles = [
      { key: 'upper' as const, color: '#1e3a5f', label: 'Upper income', dash: '' },
      { key: 'middle' as const, color: '#2563eb', label: 'Middle income', dash: '8 4' },
      { key: 'lower' as const, color: '#60a5fa', label: 'Lower income', dash: '3 3' },
    ]

    return (
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        style={{ maxWidth: chartWidth }}
      >
        {/* Y-axis gridlines */}
        {[0, 20, 40, 60].map(value => (
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
        {incomeShareData.map(d => (
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

        {/* Lines */}
        {lineStyles.map(style => (
          <g key={style.key}>
            <path
              d={createPath(style.key)}
              fill="none"
              stroke={style.color}
              strokeWidth={2.5}
              strokeDasharray={style.dash}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Points */}
            {incomeShareData.map(d => (
              <circle
                key={d.year}
                cx={xScale(d.year)}
                cy={yScale(d[style.key] * animationProgress)}
                r={4}
                fill={style.color}
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </g>
        ))}

        {/* Legend */}
        {lineStyles.map((style, i) => {
          const lastData = incomeShareData[incomeShareData.length - 1]
          return (
            <g key={style.key}>
              <line
                x1={chartWidth - padding.right + 10}
                y1={yScale(lastData[style.key] * animationProgress)}
                x2={chartWidth - padding.right + 30}
                y2={yScale(lastData[style.key] * animationProgress)}
                stroke={style.color}
                strokeWidth={2.5}
                strokeDasharray={style.dash}
              />
              <text
                x={chartWidth - padding.right + 35}
                y={yScale(lastData[style.key] * animationProgress)}
                dominantBaseline="middle"
                className="fill-neutral-600 text-xs font-semibold"
              >
                {style.label} {Math.round(lastData[style.key])}%
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
          Share of U.S. Household Income by Tier (1970-2022)
        </text>

        {/* Y-axis label */}
        <text
          x={-chartHeight / 2 + 30}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="fill-neutral-500 text-xs"
        >
          Percent of Total Household Income
        </text>
      </svg>
    )
  }

  return (
    <div ref={chartRef} className="w-full">
      {/* Tab switcher */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('wealth')}
          className={`px-4 py-2 rounded-full font-sans font-semibold text-sm transition-all ${
            activeTab === 'wealth'
              ? 'bg-primary-500 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Wealth Distribution
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`px-4 py-2 rounded-full font-sans font-semibold text-sm transition-all ${
            activeTab === 'income'
              ? 'bg-primary-500 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Income Share Over Time
        </button>
      </div>

      {activeTab === 'wealth' ? renderWealthChart() : renderIncomeChart()}

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">62.6%</div>
          <div className="text-sm text-neutral-600">Wealth held by Top 10%</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">5.6%</div>
          <div className="text-sm text-neutral-600">Wealth held by Bottom 50%</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">-19%</div>
          <div className="text-sm text-neutral-600">Middle Class Income Share Loss</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">+19%</div>
          <div className="text-sm text-neutral-600">Upper Income Share Gain</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-neutral-700 text-sm">
          <strong>The Great Divergence:</strong> Since 1970, the middle class share of income has fallen from 62% to 43%,
          while the upper income share rose from 29% to 48%. The wealthiest 10% of households now hold nearly two-thirds
          of all American wealth, while the bottom half holds just 5.6%.
        </p>
      </div>
    </div>
  )
}
