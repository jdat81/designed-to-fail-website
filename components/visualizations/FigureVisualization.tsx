'use client'

import dynamic from 'next/dynamic'

// Dynamic imports for visualization components
const TrustDeclineChart = dynamic(() => import('./TrustDeclineChart'), {
  loading: () => <VisualizationPlaceholder />,
  ssr: false,
})

const IncomeInequalityChart = dynamic(() => import('./IncomeInequalityChart'), {
  loading: () => <VisualizationPlaceholder />,
  ssr: false,
})

const TerritoryTimeline = dynamic(() => import('./TerritoryTimeline'), {
  loading: () => <VisualizationPlaceholder />,
  ssr: false,
})

function VisualizationPlaceholder() {
  return (
    <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-400 font-sans text-sm">Loading visualization...</p>
      </div>
    </div>
  )
}

function DefaultVisualization() {
  return (
    <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center relative overflow-hidden">
      <div className="text-center p-8">
        <svg className="w-24 h-24 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-neutral-400 font-sans text-sm">
          Interactive visualization coming soon
        </p>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
        <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Map figure slugs to visualization components
const visualizationMap: Record<string, React.ComponentType> = {
  '8-1-trust-decline': TrustDeclineChart,
  '9-1-mean-income': IncomeInequalityChart,
  '9-2-share-income': IncomeInequalityChart,
  '9-3-wealth-share': IncomeInequalityChart,
  '11-4-income-share': IncomeInequalityChart,
  '5-1-territories-1770': TerritoryTimeline,
  '5-2-territories-1800': TerritoryTimeline,
  '5-3-territories-1809': TerritoryTimeline,
  '5-4-territories-1850': TerritoryTimeline,
}

interface FigureVisualizationProps {
  slug: string
}

export default function FigureVisualization({ slug }: FigureVisualizationProps) {
  const VisualizationComponent = visualizationMap[slug]

  if (VisualizationComponent) {
    return (
      <div className="max-w-4xl mx-auto mb-12 bg-white rounded-xl p-6 lg:p-8 shadow-soft">
        <VisualizationComponent />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <DefaultVisualization />
    </div>
  )
}
