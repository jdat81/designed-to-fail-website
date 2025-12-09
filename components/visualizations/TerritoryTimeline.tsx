'use client'

import { useState, useEffect } from 'react'

const territoryData = [
  {
    year: 1770,
    name: 'Original Colonies',
    description: 'Thirteen colonies hugging the Atlantic coast',
    area: 400000,
    color: '#3b82f6',
  },
  {
    year: 1800,
    name: 'Early Republic',
    description: 'Expansion beyond the Appalachians',
    area: 864746,
    color: '#8b5cf6',
  },
  {
    year: 1809,
    name: 'Louisiana Purchase',
    description: 'Doubled the nation\'s size',
    area: 1716003,
    color: '#ec4899',
  },
  {
    year: 1850,
    name: 'Continental Empire',
    description: 'Atlantic to Pacific after Mexican-American War',
    area: 2959064,
    color: '#f97316',
  },
]

interface TerritoryTimelineProps {
  initialYear?: 1770 | 1800 | 1809 | 1850
}

export default function TerritoryTimeline({ initialYear = 1770 }: TerritoryTimelineProps) {
  // Find the index for the initial year
  const initialIndex = territoryData.findIndex(d => d.year === initialYear)
  const startIndex = initialIndex >= 0 ? initialIndex : 0

  const [animated, setAnimated] = useState(false)
  const [activeYear, setActiveYear] = useState(startIndex)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    // Start animation after mount
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto-play through remaining years after animation starts
    if (animated && isAutoPlaying && activeYear < territoryData.length - 1) {
      const timer = setTimeout(() => {
        setActiveYear(prev => prev + 1)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [animated, activeYear, isAutoPlaying])

  const maxArea = Math.max(...territoryData.map(d => d.area))

  const handleYearClick = (index: number) => {
    setIsAutoPlaying(false)
    setActiveYear(index)
  }

  // Get current territory data for focused display
  const currentTerritory = territoryData[activeYear]
  const startTerritory = territoryData[startIndex]

  return (
    <div className="w-full">
      {/* Title showing the figure's focus year */}
      <h3 className="text-center text-lg font-serif font-semibold text-primary-500 mb-6">
        U.S. Territorial Expansion: {startTerritory.year} - {startTerritory.name}
      </h3>

      {/* Year selector buttons */}
      <div className="flex justify-center gap-3 mb-8">
        {territoryData.map((item, i) => (
          <button
            key={item.year}
            onClick={() => handleYearClick(i)}
            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              i <= activeYear && animated
                ? 'text-white shadow-lg scale-105'
                : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
            }`}
            style={{
              backgroundColor: i <= activeYear && animated ? item.color : undefined,
            }}
          >
            {item.year}
          </button>
        ))}
      </div>

      {/* Main visualization */}
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8">
        {/* Timeline items */}
        <div className="space-y-6">
          {territoryData.map((item, i) => {
            const isActive = animated && i <= activeYear
            const isCurrent = i === activeYear
            const sizePercent = (item.area / maxArea) * 100

            return (
              <div
                key={item.year}
                className={`relative transition-all duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className="flex items-center gap-6">
                  {/* Year badge */}
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                      isCurrent && animated ? 'scale-110 shadow-xl' : ''
                    }`}
                    style={{
                      backgroundColor: isActive ? item.color : '#e5e7eb',
                      color: isActive ? 'white' : '#9ca3af',
                    }}
                  >
                    {item.year}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold mb-1 transition-colors duration-500`}
                      style={{ color: isActive ? item.color : '#9ca3af' }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-3">{item.description}</p>

                    {/* Area bar */}
                    <div className="relative h-10 bg-white rounded-xl overflow-hidden shadow-inner">
                      <div
                        className="absolute inset-y-0 left-0 rounded-xl transition-all duration-1000 ease-out"
                        style={{
                          width: isActive ? `${sizePercent}%` : '0%',
                          backgroundColor: item.color,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center px-4">
                        <span
                          className={`text-sm font-bold transition-colors duration-500 ${
                            isActive && sizePercent > 30 ? 'text-white' : 'text-neutral-600'
                          }`}
                        >
                          {item.area.toLocaleString()} sq mi
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-center text-white">
          <div className="text-3xl font-bold">
            {Math.round(((territoryData[territoryData.length - 1].area - territoryData[0].area) / territoryData[0].area) * 100)}%
          </div>
          <div className="text-sm opacity-80">Territory Growth</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-center text-white">
          <div className="text-3xl font-bold">80</div>
          <div className="text-sm opacity-80">Years of Expansion</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-center text-white">
          <div className="text-3xl font-bold">7.4x</div>
          <div className="text-sm opacity-80">Size Multiplier</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-neutral-700 text-sm">
          <strong>From coast to coast:</strong> In just 80 years, American territory expanded from the Atlantic
          seaboard to the Pacific Ocean—built on genocide of Native populations and exploitation of
          unparalleled natural resources.
        </p>
      </div>
    </div>
  )
}
