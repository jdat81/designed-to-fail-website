'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
                  {/* Figure Image */}
                  <div className="aspect-[4/3] bg-white relative overflow-hidden">
                    <Image
                      src={figure.image}
                      alt={figure.caption}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Theme Badge */}
                    <div className="absolute top-4 left-4 z-10">
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
