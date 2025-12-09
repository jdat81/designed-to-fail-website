'use client'

import { useState, useEffect } from 'react'

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

const keyEvents = [
  { year: 1963, label: 'JFK Assassination' },
  { year: 1968, label: 'MLK & RFK Killed' },
  { year: 1974, label: 'Nixon Resigns' },
]

export default function TrustDeclineChart() {
  const [animated, setAnimated] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const minTrust = 20
  const maxTrust = 85

  return (
    <div className="w-full">
      {/* Title */}
      <h3 className="text-center text-lg font-sans font-semibold text-primary-500 mb-2">
        The Collapse of Trust in Government (1958-1978)
      </h3>
      <p className="text-center text-sm text-neutral-500 mb-6">% who trust the federal government &apos;just about always&apos; or &apos;most of the time&apos;</p>

      {/* Chart */}
      <div className="relative h-80 bg-gradient-to-b from-slate-100 to-white rounded-xl p-6 overflow-visible">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-12 bottom-12 w-12 flex flex-col justify-between text-right pr-2">
          <span className="text-xs text-neutral-400">80%</span>
          <span className="text-xs text-neutral-400">60%</span>
          <span className="text-xs text-neutral-400">40%</span>
          <span className="text-xs text-neutral-400">20%</span>
        </div>

        {/* Line chart */}
        <div className="absolute left-14 right-10 top-12 bottom-12">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 50, 100, 150, 200].map(y => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="400"
                y2={y}
                stroke="#cbd5e1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Area under line */}
            <defs>
              <linearGradient id="trustAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Area path */}
            <path
              d={`
                M 0 ${200 - ((trustData[0].trust - minTrust) / (maxTrust - minTrust)) * 200 * (animated ? 1 : 0)}
                ${trustData.map((d, i) => {
                  const x = (i / (trustData.length - 1)) * 400
                  const y = 200 - ((d.trust - minTrust) / (maxTrust - minTrust)) * 200 * (animated ? 1 : 0)
                  return `L ${x} ${y}`
                }).join(' ')}
                L 400 200
                L 0 200
                Z
              `}
              fill="url(#trustAreaGradient)"
              className="transition-all duration-1500"
            />

            {/* Line */}
            <path
              d={`
                M 0 ${200 - ((trustData[0].trust - minTrust) / (maxTrust - minTrust)) * 200 * (animated ? 1 : 0)}
                ${trustData.map((d, i) => {
                  const x = (i / (trustData.length - 1)) * 400
                  const y = 200 - ((d.trust - minTrust) / (maxTrust - minTrust)) * 200 * (animated ? 1 : 0)
                  return `L ${x} ${y}`
                }).join(' ')}
              `}
              fill="none"
              stroke="#1e3a5f"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-1500"
            />

            {/* Data points */}
            {trustData.map((d, i) => {
              const x = (i / (trustData.length - 1)) * 400
              const y = 200 - ((d.trust - minTrust) / (maxTrust - minTrust)) * 200 * (animated ? 1 : 0)
              const isHovered = hoveredIndex === i
              const isEndpoint = i === 0 || i === trustData.length - 1

              return (
                <g key={d.year}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 10 : isEndpoint ? 8 : 5}
                    fill="#1e3a5f"
                    stroke="white"
                    strokeWidth="3"
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                  {/* Show value on hover or endpoints */}
                  {(isHovered || isEndpoint) && animated && (
                    <>
                      <rect
                        x={x - 25}
                        y={y - 35}
                        width="50"
                        height="24"
                        rx="4"
                        fill="white"
                        stroke="#1e3a5f"
                        strokeWidth="1"
                      />
                      <text
                        x={x}
                        y={y - 19}
                        textAnchor="middle"
                        className="text-sm font-bold fill-slate-600"
                      >
                        {d.trust}%
                      </text>
                    </>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-14 right-10 bottom-2 flex justify-between px-0">
          {trustData.filter((_, i) => i % 2 === 0).map(d => (
            <span key={d.year} className="text-xs text-neutral-400">{d.year}</span>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-lg z-10 pointer-events-none"
            style={{
              left: `calc(3rem + ${(hoveredIndex / (trustData.length - 1)) * 100}% - 40px)`,
              bottom: '3rem'
            }}
          >
            <div className="font-bold text-slate-600">{trustData[hoveredIndex].year}</div>
            <div className="text-sm text-neutral-600">{trustData[hoveredIndex].trust}% trust</div>
          </div>
        )}
      </div>

      {/* Key Events Timeline */}
      <div className="mt-6 bg-slate-50 rounded-xl p-4">
        <h4 className="font-semibold text-slate-800 mb-3 text-sm">Key Events</h4>
        <div className="flex justify-around">
          {keyEvents.map(event => (
            <div key={event.year} className="text-center">
              <div className="text-lg font-bold text-slate-600">{event.year}</div>
              <div className="text-xs text-neutral-600">{event.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-50 rounded-xl p-4 text-center border-t-4 border-slate-400">
          <div className="text-3xl font-bold text-slate-600">73%</div>
          <div className="text-sm text-neutral-600">1958 Peak</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center border-t-4 border-slate-500">
          <div className="text-3xl font-bold text-slate-700">30%</div>
          <div className="text-sm text-neutral-600">1978 Low</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center border-t-4 border-slate-600">
          <div className="text-3xl font-bold text-slate-800">-43pts</div>
          <div className="text-sm text-neutral-600">Total Decline</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-slate-50 rounded-lg border-l-4 border-slate-500">
        <p className="text-neutral-700 text-sm">
          <strong>A Generation of Disillusionment:</strong> Trust in government collapsed by 43 percentage points
          in just 20 years—driven by Vietnam, Watergate, assassinations, and civil unrest. This erosion of faith
          fundamentally reshaped American political culture and continues to shape our democracy today.
        </p>
      </div>
    </div>
  )
}
