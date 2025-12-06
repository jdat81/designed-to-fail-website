'use client'

import { useState, useEffect, useRef } from 'react'

const territoryData = [
  {
    year: 1770,
    name: 'Original Colonies',
    description: 'Thirteen colonies hugging the Atlantic coast',
    area: 400000,
    color: '#1A1A2E',
  },
  {
    year: 1800,
    name: 'Early Republic',
    description: 'Expansion beyond the Appalachians',
    area: 864746,
    color: '#2D2D44',
  },
  {
    year: 1809,
    name: 'Louisiana Purchase',
    description: 'Doubled the nation\'s size',
    area: 1716003,
    color: '#3D3D5C',
  },
  {
    year: 1850,
    name: 'Continental Empire',
    description: 'Atlantic to Pacific after Mexican-American War',
    area: 2959064,
    color: '#4D4D74',
  },
]

export default function TerritoryTimeline() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeYear, setActiveYear] = useState(0)
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
    if (isVisible && activeYear < territoryData.length - 1) {
      const timer = setTimeout(() => {
        setActiveYear(prev => prev + 1)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isVisible, activeYear])

  const maxArea = Math.max(...territoryData.map(d => d.area))

  return (
    <div ref={chartRef} className="w-full">
      {/* Timeline visualization */}
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-neutral-200 -translate-x-1/2" />
        <div
          className="absolute left-1/2 top-0 w-1 bg-primary-500 -translate-x-1/2 transition-all duration-1000"
          style={{ height: `${((activeYear + 1) / territoryData.length) * 100}%` }}
        />

        {/* Timeline items */}
        <div className="space-y-8 py-4">
          {territoryData.map((item, i) => {
            const isActive = i <= activeYear
            const sizePercent = (item.area / maxArea) * 100

            return (
              <div
                key={item.year}
                className={`relative flex items-center gap-8 transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {/* Left side - Year */}
                <div className="w-1/4 text-right pr-8">
                  <div
                    className={`text-4xl font-serif font-bold transition-colors duration-500 ${
                      isActive ? 'text-primary-500' : 'text-neutral-300'
                    }`}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Center - Node */}
                <div className="relative z-10">
                  <div
                    className={`w-6 h-6 rounded-full border-4 transition-all duration-500 ${
                      isActive
                        ? 'bg-primary-500 border-primary-500 scale-125'
                        : 'bg-white border-neutral-300'
                    }`}
                  />
                </div>

                {/* Right side - Content */}
                <div className="w-2/3 pl-8">
                  <h3
                    className={`font-serif text-xl font-semibold mb-1 transition-colors duration-500 ${
                      isActive ? 'text-primary-500' : 'text-neutral-400'
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-3">{item.description}</p>

                  {/* Area bar */}
                  <div className="relative h-8 bg-neutral-100 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-lg transition-all duration-1000 ease-out"
                      style={{
                        width: isActive ? `${sizePercent}%` : '0%',
                        backgroundColor: item.color,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center px-4">
                      <span
                        className={`text-sm font-semibold transition-colors duration-500 ${
                          isActive && sizePercent > 30 ? 'text-white' : 'text-neutral-600'
                        }`}
                      >
                        {item.area.toLocaleString()} sq mi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-8 grid grid-cols-3 gap-4 bg-neutral-50 rounded-xl p-6">
        <div className="text-center">
          <div className="text-3xl font-serif font-bold text-primary-500">
            {Math.round(((territoryData[territoryData.length - 1].area - territoryData[0].area) / territoryData[0].area) * 100)}%
          </div>
          <div className="text-sm text-neutral-600">Territory Growth</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-serif font-bold text-secondary-500">80</div>
          <div className="text-sm text-neutral-600">Years of Expansion</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-serif font-bold text-accent-red">7.4x</div>
          <div className="text-sm text-neutral-600">Size Multiplier</div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex justify-center gap-2">
        {territoryData.map((item, i) => (
          <button
            key={item.year}
            onClick={() => setActiveYear(i)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              i <= activeYear
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
            }`}
          >
            {item.year}
          </button>
        ))}
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-primary-500/10 rounded-lg border-l-4 border-primary-500">
        <p className="text-neutral-700 text-sm">
          <strong>From coast to coast:</strong> In just 80 years, American territory expanded from the Atlantic
          seaboard to the Pacific Ocean—built on genocide of Native populations and exploitation of
          unparalleled natural resources.
        </p>
      </div>
    </div>
  )
}
