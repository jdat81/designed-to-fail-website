'use client'

import { Figure } from '@/lib/types'

// Mini visualization components for thumbnails - colorful and distinctive

function TerritoryThumbnail({ year }: { year: number }) {
  // Different colors for different years showing expansion
  const configs: Record<number, { colonies: string; expansion: number; color: string }> = {
    1770: { colonies: '#3b82f6', expansion: 15, color: 'from-blue-100 to-blue-50' },
    1800: { colonies: '#8b5cf6', expansion: 30, color: 'from-purple-100 to-purple-50' },
    1809: { colonies: '#ec4899', expansion: 55, color: 'from-pink-100 to-pink-50' },
    1850: { colonies: '#f97316', expansion: 95, color: 'from-orange-100 to-orange-50' },
  }
  const config = configs[year] || configs[1770]

  return (
    <div className={`w-full h-full bg-gradient-to-br ${config.color} flex items-center justify-center p-4`}>
      <div className="relative w-full max-w-[200px]">
        {/* Simplified US map shape */}
        <svg viewBox="0 0 200 120" className="w-full h-auto">
          {/* Continental outline */}
          <path
            d="M10 30 L40 25 L60 20 L100 15 L140 20 L170 25 L190 35 L185 50 L190 70 L180 90 L150 95 L120 100 L80 95 L50 90 L20 80 L10 60 Z"
            fill="#e5e7eb"
            stroke="#9ca3af"
            strokeWidth="1"
          />
          {/* Expansion area - grows with year */}
          <rect
            x="10"
            y="25"
            width={config.expansion * 1.8}
            height="70"
            fill={config.colonies}
            opacity="0.7"
            rx="4"
          />
          {/* Year badge */}
          <rect x="70" y="45" width="60" height="30" rx="4" fill="white" />
          <text x="100" y="67" textAnchor="middle" className="text-lg font-bold" fill={config.colonies}>
            {year}
          </text>
        </svg>
      </div>
    </div>
  )
}

function MineralsThumbnail() {
  const bars = [
    { value: 95, color: '#dc2626', label: 'Gas' },
    { value: 65, color: '#f97316', label: 'Oil' },
    { value: 56, color: '#eab308', label: 'Cu' },
    { value: 43, color: '#22c55e', label: 'P' },
  ]

  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[180px] space-y-2">
        {bars.map((bar, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-neutral-600 w-6">{bar.label}</span>
            <div className="flex-1 h-4 bg-white/50 rounded overflow-hidden">
              <div
                className="h-full rounded"
                style={{ width: `${bar.value}%`, backgroundColor: bar.color }}
              />
            </div>
            <span className="text-[10px] font-bold" style={{ color: bar.color }}>{bar.value}%</span>
          </div>
        ))}
        <div className="text-center mt-2">
          <span className="text-[10px] font-semibold text-neutral-500">% World Output 1913</span>
        </div>
      </div>
    </div>
  )
}

function TrustDeclineThumbnail() {
  const points = [
    { x: 0, y: 73 },
    { x: 25, y: 77 },
    { x: 50, y: 53 },
    { x: 75, y: 36 },
    { x: 100, y: 30 },
  ]

  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[180px]">
        <svg viewBox="0 0 120 80" className="w-full h-auto">
          {/* Grid */}
          <line x1="10" y1="10" x2="10" y2="70" stroke="#fed7aa" strokeWidth="1" />
          <line x1="10" y1="70" x2="110" y2="70" stroke="#fed7aa" strokeWidth="1" />

          {/* Area under line */}
          <defs>
            <linearGradient id="trustGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d={`M 10 ${80 - points[0].y} ${points.map(p => `L ${10 + p.x} ${80 - p.y}`).join(' ')} L 110 70 L 10 70 Z`}
            fill="url(#trustGrad)"
          />

          {/* Line */}
          <path
            d={`M 10 ${80 - points[0].y} ${points.map(p => `L ${10 + p.x} ${80 - p.y}`).join(' ')}`}
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Start and end points */}
          <circle cx="10" cy={80 - points[0].y} r="4" fill="#f97316" />
          <circle cx="110" cy={80 - points[4].y} r="4" fill="#f97316" />

          {/* Labels */}
          <text x="10" y={80 - points[0].y - 6} textAnchor="middle" className="text-[8px] font-bold" fill="#f97316">73%</text>
          <text x="110" y={80 - points[4].y + 12} textAnchor="middle" className="text-[8px] font-bold" fill="#f97316">30%</text>
        </svg>
        <div className="text-center">
          <span className="text-[10px] font-semibold text-orange-600">Trust Collapse 1958-78</span>
        </div>
      </div>
    </div>
  )
}

function IncomeInequalityThumbnail() {
  const bars = [
    { bottom: 3, middle: 44, top: 29, top5: 24 },
  ]

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="flex items-end justify-center gap-3 h-24">
        {/* Stacked bar visualization */}
        <div className="flex flex-col-reverse w-16 h-full">
          <div className="bg-purple-500 rounded-b" style={{ height: '6%' }} title="Bottom 20%" />
          <div className="bg-blue-500" style={{ height: '44%' }} title="Middle 60%" />
          <div className="bg-orange-500" style={{ height: '26%' }} title="Top 15-20%" />
          <div className="bg-red-500 rounded-t" style={{ height: '24%' }} title="Top 5%" />
        </div>
        <div className="flex flex-col justify-between h-full text-[8px] text-neutral-500">
          <span className="text-red-500 font-bold">24%</span>
          <span className="text-blue-500 font-bold">44%</span>
          <span className="text-purple-500 font-bold">3%</span>
        </div>
      </div>
      <div className="absolute bottom-3 text-[10px] font-semibold text-neutral-600">
        Income Share 2023
      </div>
    </div>
  )
}

function WalmartGrowthThumbnail() {
  const bars = [1, 24, 125, 882, 2943, 6141]
  const maxVal = Math.max(...bars)

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[180px]">
        <div className="flex items-end justify-between h-16 gap-1">
          {bars.map((val, i) => (
            <div
              key={i}
              className="flex-1 bg-blue-500 rounded-t transition-all"
              style={{ height: `${(val / maxVal) * 100}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[8px] text-neutral-400 mt-1">
          <span>1962</span>
          <span>2005</span>
        </div>
        <div className="text-center mt-1">
          <span className="text-[10px] font-bold text-blue-600">1 → 6,141 stores</span>
        </div>
      </div>
    </div>
  )
}

function HousingBubbleThumbnail() {
  const points = [
    { x: 0, y: 0 },
    { x: 20, y: 20 },
    { x: 40, y: 50 },
    { x: 60, y: 100 }, // Peak
    { x: 80, y: 50 },
    { x: 100, y: 15 },
  ]

  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[180px]">
        <svg viewBox="0 0 120 70" className="w-full h-auto">
          {/* Crisis shading */}
          <rect x="65" y="5" width="50" height="55" fill="#fecaca" opacity="0.5" />

          <defs>
            <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Area */}
          <path
            d={`M 10 60 ${points.map(p => `L ${10 + p.x} ${60 - p.y * 0.5}`).join(' ')} L 110 60 Z`}
            fill="url(#bubbleGrad)"
          />

          {/* Line */}
          <path
            d={`M 10 60 ${points.map(p => `L ${10 + p.x} ${60 - p.y * 0.5}`).join(' ')}`}
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Peak marker */}
          <circle cx="70" cy="10" r="4" fill="#dc2626" />
          <text x="70" y="6" textAnchor="middle" className="text-[7px] font-bold" fill="#dc2626">Peak</text>
        </svg>
        <div className="text-center">
          <span className="text-[10px] font-semibold text-orange-600">Housing Bubble 2000-10</span>
        </div>
      </div>
    </div>
  )
}

function WealthDistributionThumbnail() {
  // Pie chart showing wealth concentration
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          {/* Top 1% - large slice */}
          <circle cx="50" cy="50" r="40" fill="#e5e7eb" />
          <path
            d="M 50 50 L 50 10 A 40 40 0 0 1 90 50 Z"
            fill="#dc2626"
          />
          <path
            d="M 50 50 L 90 50 A 40 40 0 0 1 50 90 Z"
            fill="#f97316"
          />
          <circle cx="50" cy="50" r="15" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-neutral-600">Top 1%</span>
        </div>
      </div>
      <div className="ml-2 space-y-1 text-[8px]">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-sm" />
          <span className="text-neutral-600">Top 1%: 30%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-orange-500 rounded-sm" />
          <span className="text-neutral-600">Next 9%: 37%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-neutral-300 rounded-sm" />
          <span className="text-neutral-600">Bottom 90%</span>
        </div>
      </div>
    </div>
  )
}

function StateHomePricesThumbnail() {
  const states = [
    { name: 'NV', value: 135, color: '#dc2626' },
    { name: 'AZ', value: 110, color: '#f97316' },
    { name: 'FL', value: 105, color: '#eab308' },
    { name: 'CA', value: 95, color: '#22c55e' },
  ]

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[180px] space-y-2">
        {states.map((state, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-neutral-600 w-6">{state.name}</span>
            <div className="flex-1 h-3 bg-white/50 rounded overflow-hidden">
              <div
                className="h-full rounded"
                style={{ width: `${(state.value / 135) * 100}%`, backgroundColor: state.color }}
              />
            </div>
            <span className="text-[9px] font-bold" style={{ color: state.color }}>+{state.value}%</span>
          </div>
        ))}
        <div className="text-center mt-1">
          <span className="text-[10px] font-semibold text-neutral-500">Price Growth 2000-05</span>
        </div>
      </div>
    </div>
  )
}

function WalmartMapsThumbnail() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-[180px]">
        <svg viewBox="0 0 200 120" className="w-full h-auto">
          {/* US outline */}
          <path
            d="M10 30 L40 25 L60 20 L100 15 L140 20 L170 25 L190 35 L185 50 L190 70 L180 90 L150 95 L120 100 L80 95 L50 90 L20 80 L10 60 Z"
            fill="#e5e7eb"
            stroke="#9ca3af"
            strokeWidth="1"
          />
          {/* Dots representing stores spreading from Arkansas */}
          <circle cx="110" cy="65" r="3" fill="#3b82f6" />
          <circle cx="100" cy="60" r="2" fill="#3b82f6" opacity="0.9" />
          <circle cx="120" cy="70" r="2" fill="#3b82f6" opacity="0.9" />
          <circle cx="90" cy="65" r="2" fill="#3b82f6" opacity="0.8" />
          <circle cx="130" cy="60" r="2" fill="#3b82f6" opacity="0.8" />
          <circle cx="80" cy="55" r="2" fill="#3b82f6" opacity="0.7" />
          <circle cx="140" cy="55" r="2" fill="#3b82f6" opacity="0.7" />
          <circle cx="70" cy="50" r="2" fill="#3b82f6" opacity="0.6" />
          <circle cx="150" cy="50" r="2" fill="#3b82f6" opacity="0.6" />
          <circle cx="60" cy="45" r="2" fill="#3b82f6" opacity="0.5" />
          <circle cx="160" cy="45" r="2" fill="#3b82f6" opacity="0.5" />
          <circle cx="50" cy="50" r="2" fill="#3b82f6" opacity="0.4" />
          <circle cx="170" cy="55" r="2" fill="#3b82f6" opacity="0.4" />
        </svg>
        <div className="text-center mt-1">
          <span className="text-[10px] font-semibold text-blue-600">Walmart Expansion</span>
        </div>
      </div>
    </div>
  )
}

interface FigureThumbnailProps {
  figure: Figure
}

export default function FigureThumbnail({ figure }: FigureThumbnailProps) {
  const slug = figure.slug

  // Territory maps
  if (slug === '5-1-territories-1770') return <TerritoryThumbnail year={1770} />
  if (slug === '5-2-territories-1800') return <TerritoryThumbnail year={1800} />
  if (slug === '5-3-territories-1809') return <TerritoryThumbnail year={1809} />
  if (slug === '5-4-territories-1850') return <TerritoryThumbnail year={1850} />

  // Other visualizations
  if (slug === '5-5-minerals-1913') return <MineralsThumbnail />
  if (slug === '8-1-trust-decline') return <TrustDeclineThumbnail />
  if (slug === '9-1-mean-income' || slug === '9-2-share-income' || slug === '9-3-wealth-share') return <IncomeInequalityThumbnail />
  if (slug === '10-1-wal-growth') return <WalmartGrowthThumbnail />
  if (slug === '10-2-wal-maps') return <WalmartMapsThumbnail />
  if (slug === '11-1-national-home-prices') return <HousingBubbleThumbnail />
  if (slug === '11-2-state-home-prices') return <StateHomePricesThumbnail />
  if (slug === '11-3-wealth-distribution-2025' || slug === '11-4-income-share') return <WealthDistributionThumbnail />

  // Fallback - show a placeholder with the figure number
  return (
    <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-neutral-400">{figure.number}</div>
        <div className="text-xs text-neutral-400">Interactive</div>
      </div>
    </div>
  )
}
