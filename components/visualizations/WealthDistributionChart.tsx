'use client'

import { useState, useEffect } from 'react'

// Wealth distribution data Q1 2025
const wealthData = [
  { category: 'Top 1%', value: 28.0, color: '#dc2626' },
  { category: 'Next 9%', value: 34.6, color: '#f97316' },
  { category: 'Next 40%', value: 31.8, color: '#3b82f6' },
  { category: 'Bottom 50%', value: 5.6, color: '#8b5cf6' },
]

export default function WealthDistributionChart() {
  const [animated, setAnimated] = useState(false)
  const [activeTab, setActiveTab] = useState<'wealth' | 'income'>('wealth')

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const maxValue = Math.max(...wealthData.map(d => d.value))

  return (
    <div className="w-full">
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

      {activeTab === 'wealth' ? (
        <>
          {/* Title */}
          <h3 className="text-center text-lg font-serif font-semibold text-primary-500 mb-6">
            Distribution of U.S. Household Wealth (Q1 2025)
          </h3>

          {/* Bar Chart */}
          <div className="flex items-end justify-around h-64 px-8 bg-gradient-to-b from-slate-50 to-white rounded-xl pt-8 pb-4">
            {wealthData.map((item, index) => (
              <div key={item.category} className="flex flex-col items-center flex-1 max-w-[140px]">
                {/* Value label */}
                <div
                  className="mb-2 text-lg font-bold transition-opacity duration-500"
                  style={{
                    color: item.color,
                    opacity: animated ? 1 : 0,
                    transitionDelay: `${index * 150 + 500}ms`
                  }}
                >
                  {item.value}%
                </div>

                {/* Bar */}
                <div className="w-16 bg-neutral-100 rounded-t-lg overflow-hidden" style={{ height: '180px' }}>
                  <div
                    className="w-full rounded-t-lg transition-all duration-1000 ease-out"
                    style={{
                      height: animated ? `${(item.value / maxValue) * 100}%` : '0%',
                      backgroundColor: item.color,
                      marginTop: 'auto',
                      position: 'relative',
                      top: animated ? `${100 - (item.value / maxValue) * 100}%` : '100%',
                      transitionDelay: `${index * 150}ms`,
                    }}
                  />
                </div>

                {/* Label */}
                <div className="mt-3 text-xs text-center text-neutral-600 font-medium">
                  {item.category}
                </div>
              </div>
            ))}
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-red-50 rounded-xl p-4 text-center border-t-4 border-red-500">
              <div className="text-2xl font-bold text-red-600">62.6%</div>
              <div className="text-sm text-neutral-600">Top 10% Share</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center border-t-4 border-purple-500">
              <div className="text-2xl font-bold text-purple-600">5.6%</div>
              <div className="text-sm text-neutral-600">Bottom 50% Share</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center border-t-4 border-orange-500">
              <div className="text-2xl font-bold text-orange-600">11x</div>
              <div className="text-sm text-neutral-600">Top vs Bottom Ratio</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border-t-4 border-blue-500">
              <div className="text-2xl font-bold text-blue-600">$150T</div>
              <div className="text-sm text-neutral-600">Total US Wealth</div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Income Share Over Time */}
          <h3 className="text-center text-lg font-serif font-semibold text-primary-500 mb-6">
            Share of U.S. Household Income by Tier (1970-2022)
          </h3>

          {/* Timeline comparison */}
          <div className="grid grid-cols-2 gap-8">
            {/* 1970 */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-center font-bold text-blue-800 text-xl mb-4">1970</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Upper Income</span>
                    <span className="font-bold text-red-600">29%</span>
                  </div>
                  <div className="h-4 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '29%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Middle Income</span>
                    <span className="font-bold text-blue-600">62%</span>
                  </div>
                  <div className="h-4 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '62%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Lower Income</span>
                    <span className="font-bold text-purple-600">10%</span>
                  </div>
                  <div className="h-4 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 2022 */}
            <div className="bg-red-50 rounded-xl p-6">
              <h4 className="text-center font-bold text-red-800 text-xl mb-4">2022</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Upper Income</span>
                    <span className="font-bold text-red-600">48%</span>
                  </div>
                  <div className="h-4 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all duration-1000"
                      style={{ width: animated ? '48%' : '29%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Middle Income</span>
                    <span className="font-bold text-blue-600">43%</span>
                  </div>
                  <div className="h-4 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: animated ? '43%' : '62%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Lower Income</span>
                    <span className="font-bold text-purple-600">8%</span>
                  </div>
                  <div className="h-4 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: animated ? '8%' : '10%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Change indicators */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-red-50 rounded-xl p-4 text-center border-l-4 border-red-500">
              <div className="text-2xl font-bold text-red-600">+19%</div>
              <div className="text-sm text-neutral-600">Upper Income Gain</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border-l-4 border-blue-500">
              <div className="text-2xl font-bold text-blue-600">-19%</div>
              <div className="text-sm text-neutral-600">Middle Income Loss</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center border-l-4 border-purple-500">
              <div className="text-2xl font-bold text-purple-600">-2%</div>
              <div className="text-sm text-neutral-600">Lower Income Loss</div>
            </div>
          </div>
        </>
      )}

      {/* Key insight */}
      <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-purple-50 rounded-lg border-l-4 border-red-500">
        <p className="text-neutral-700 text-sm">
          <strong>The Great Divergence:</strong> Since 1970, the middle class share of income has fallen from 62% to 43%,
          while the upper income share rose from 29% to 48%. The wealthiest 10% of households now hold nearly two-thirds
          of all American wealth, while the bottom half holds just 5.6%.
        </p>
      </div>
    </div>
  )
}
