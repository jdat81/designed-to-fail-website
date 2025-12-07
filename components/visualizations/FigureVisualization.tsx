'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { getFigureBySlug } from '@/lib/content/figures'

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

const HousingBubbleChart = dynamic(() => import('./HousingBubbleChart'), {
  loading: () => <VisualizationPlaceholder />,
  ssr: false,
})

const WalmartGrowthChart = dynamic(() => import('./WalmartGrowthChart'), {
  loading: () => <VisualizationPlaceholder />,
  ssr: false,
})

const WealthDistributionChart = dynamic(() => import('./WealthDistributionChart'), {
  loading: () => <VisualizationPlaceholder />,
  ssr: false,
})

const MineralOutputChart = dynamic(() => import('./MineralOutputChart'), {
  loading: () => <VisualizationPlaceholder />,
  ssr: false,
})

const StateHomePricesChart = dynamic(() => import('./StateHomePricesChart'), {
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

function DefaultVisualization({ slug }: { slug: string }) {
  const figure = getFigureBySlug(slug)

  if (figure?.image) {
    return (
      <div className="bg-white rounded-xl p-4 lg:p-8 relative">
        <div className="relative w-full" style={{ minHeight: '400px' }}>
          <Image
            src={figure.image}
            alt={figure.caption}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
            unoptimized
          />
        </div>
      </div>
    )
  }

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
    </div>
  )
}

// Map figure slugs to visualization components
const visualizationMap: Record<string, React.ComponentType> = {
  // Trust decline
  '8-1-trust-decline': TrustDeclineChart,
  // Income inequality
  '9-1-mean-income': IncomeInequalityChart,
  '9-2-share-income': IncomeInequalityChart,
  '9-3-wealth-share': IncomeInequalityChart,
  // Territory maps
  '5-1-territories-1770': TerritoryTimeline,
  '5-2-territories-1800': TerritoryTimeline,
  '5-3-territories-1809': TerritoryTimeline,
  '5-4-territories-1850': TerritoryTimeline,
  // Minerals
  '5-5-minerals-1913': MineralOutputChart,
  // Walmart growth
  '10-1-wal-growth': WalmartGrowthChart,
  // Housing bubble
  '11-1-national-home-prices': HousingBubbleChart,
  '11-2-state-home-prices': StateHomePricesChart,
  // Wealth distribution / income share
  '11-3-wealth-distribution-2025': WealthDistributionChart,
  '11-4-income-share': WealthDistributionChart,
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
      <DefaultVisualization slug={slug} />
    </div>
  )
}
