'use client'

import { useState } from 'react'
import Link from 'next/link'
import { figures } from '@/lib/content/figures'
import { cn } from '@/lib/utils/cn'

const themes = [
  { id: 'all', label: 'All Figures' },
  { id: 'territory', label: 'Territory' },
  { id: 'economy', label: 'Economy' },
  { id: 'inequality', label: 'Inequality' },
  { id: 'trust', label: 'Trust' },
]

const themeColors = {
  territory: 'bg-accent-red/10 text-accent-red',
  economy: 'bg-secondary-500/10 text-secondary-600',
  inequality: 'bg-primary-500/10 text-primary-500',
  trust: 'bg-neutral-200 text-neutral-700',
}

export default function FiguresPage() {
  const [activeTheme, setActiveTheme] = useState('all')

  const filteredFigures = activeTheme === 'all'
    ? figures
    : figures.filter(f => f.theme === activeTheme)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-500 pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="font-serif text-display text-white mb-6">
              Data &amp;{' '}
              <span className="text-secondary-400">Visualizations</span>
            </h1>
            <p className="text-body-lg text-white/70">
              14 figures documenting 250 years of institutional design, territorial expansion, economic transformation, and the collapse of trust in American democracy.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          {/* Theme Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={cn(
                  'px-4 py-2 rounded-full font-sans font-semibold text-sm transition-all',
                  activeTheme === theme.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                )}
              >
                {theme.label}
                {theme.id !== 'all' && (
                  <span className="ml-2 text-xs opacity-70">
                    ({figures.filter(f => f.theme === theme.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Figures Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredFigures.map((figure) => (
              <Link key={figure.slug} href={`/figures/${figure.slug}`}>
                <div className="card-hover group h-full">
                  {/* Image Placeholder */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    {/* Theme Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={cn(
                        'px-3 py-1 rounded-full text-xs font-semibold capitalize',
                        themeColors[figure.theme]
                      )}>
                        {figure.theme}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-secondary-500 font-sans font-semibold text-sm mb-2">
                      Figure {figure.number}
                    </div>
                    <h3 className="font-serif text-title text-primary-500 group-hover:text-accent-red transition-colors mb-3">
                      {figure.caption}
                    </h3>
                    <p className="text-body text-neutral-600 line-clamp-2">
                      {figure.context}
                    </p>
                    <div className="mt-4 text-sm text-neutral-400">
                      Chapter {figure.chapter}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredFigures.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-500">No figures found for this theme.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
