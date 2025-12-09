'use client'

import { useState, useEffect } from 'react'

// Top 5 states by home price appreciation 2000-2005
const stateData = [
  { state: 'Nevada', abbrev: 'NV', color: '#dc2626', increase: 142 },
  { state: 'Florida', abbrev: 'FL', color: '#f97316', increase: 133 },
  { state: 'California', abbrev: 'CA', color: '#eab308', increase: 129 },
  { state: 'Arizona', abbrev: 'AZ', color: '#22c55e', increase: 121 },
  { state: 'Hawaii', abbrev: 'HI', color: '#06b6d4', increase: 110 },
]

export default function StateHomePricesChart() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const maxIncrease = Math.max(...stateData.map(s => s.increase))

  return (
    <div className="w-full">
      {/* Title */}
      <h3 className="text-center text-lg font-serif font-semibold text-primary-500 mb-6">
        Top 5 States: Home Price Appreciation (2000-2005)
      </h3>

      {/* Bar Chart */}
      <div className="space-y-4">
        {stateData.map((state, index) => (
          <div key={state.state} className="flex items-center gap-4">
            {/* State label */}
            <div className="w-24 text-right text-sm font-semibold text-neutral-700 shrink-0">
              {state.state}
            </div>

            {/* Bar */}
            <div className="flex-1 h-10 bg-neutral-100 rounded-lg overflow-hidden relative">
              <div
                className="h-full rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                style={{
                  width: animated ? `${(state.increase / maxIncrease) * 100}%` : '0%',
                  backgroundColor: state.color,
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {animated && (
                  <span className="text-white text-sm font-bold">
                    +{state.increase}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scale */}
      <div className="flex items-center gap-4 mt-4">
        <div className="w-24 shrink-0" />
        <div className="flex-1 flex justify-between text-xs text-neutral-400 px-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
          <span>150%</span>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
        {stateData.map((state) => (
          <div
            key={state.state}
            className="rounded-xl p-3 text-center transition-all duration-200"
            style={{
              backgroundColor: `${state.color}15`,
              borderTop: `4px solid ${state.color}`,
            }}
          >
            <div className="text-2xl font-bold" style={{ color: state.color }}>
              +{state.increase}%
            </div>
            <div className="text-xs text-neutral-600">{state.abbrev}</div>
          </div>
        ))}
      </div>

      {/* Crash comparison */}
      <div className="mt-8 bg-red-50 rounded-xl p-6">
        <h4 className="font-semibold text-red-700 mb-4">After the Crash (2006-2010)</h4>
        <div className="grid grid-cols-5 gap-3 text-center">
          {[
            { state: 'NV', crash: -58 },
            { state: 'FL', crash: -46 },
            { state: 'CA', crash: -44 },
            { state: 'AZ', crash: -51 },
            { state: 'HI', crash: -23 },
          ].map((s) => (
            <div key={s.state}>
              <div className="text-2xl font-bold text-red-600">{s.crash}%</div>
              <div className="text-xs text-neutral-600">{s.state}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-l-4 border-red-500">
        <p className="text-neutral-700 text-sm">
          <strong>Bubble Geography:</strong> The housing bubble hit hardest in the &quot;sand states&quot;—Nevada, Arizona, Florida, and California.
          Nevada led with a staggering 142% price increase from 2000-2005, only to crash 58% by 2010.
          These states experienced both the most dramatic gains and the most devastating losses.
        </p>
      </div>
    </div>
  )
}
