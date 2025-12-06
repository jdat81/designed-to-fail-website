'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { figures } from '@/lib/content/figures'
import { cn } from '@/lib/utils/cn'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const themes = [
  {
    id: 'territory',
    title: 'Territorial Expansion',
    description: 'Maps documenting America\'s growth from 13 colonies to continental empire',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    color: 'text-accent-red',
    bgColor: 'bg-accent-red/10',
  },
  {
    id: 'economy',
    title: 'Economic Transformation',
    description: 'Charts showing industrial growth, corporate power, and financial crises',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-500/10',
  },
  {
    id: 'inequality',
    title: 'Rising Inequality',
    description: 'Data visualizing wealth concentration and the vanishing middle class',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'text-primary-500',
    bgColor: 'bg-primary-500/10',
  },
  {
    id: 'trust',
    title: 'Collapse of Trust',
    description: 'Tracking the dramatic decline in Americans\' faith in government',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'text-neutral-700',
    bgColor: 'bg-neutral-200',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

function ThemeCard({ theme, figureCount, index }: { theme: typeof themes[0]; figureCount: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index}
    >
      <Link href={`/figures?theme=${theme.id}`}>
        <div className="card-hover card-lift group h-full p-8">
          {/* Icon */}
          <div className={cn(
            'w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors',
            theme.bgColor,
            theme.color
          )}>
            {theme.icon}
          </div>

          {/* Title */}
          <h3 className="font-serif text-title text-primary-500 group-hover:text-accent-red transition-colors mb-3">
            {theme.title}
          </h3>

          {/* Description */}
          <p className="text-body text-neutral-600 mb-4">
            {theme.description}
          </p>

          {/* Figure Count */}
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span className="font-semibold text-primary-500">{figureCount}</span>
            <span>figures</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function DataShowcase() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary-500/10 text-secondary-600 font-sans font-semibold text-sm uppercase tracking-wider mb-6">
            Data-Driven Analysis
          </span>
          <h2 className="font-serif text-display text-primary-500 mb-4">
            14 Figures That Tell the{' '}
            <span className="text-accent-red">Story</span>
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            From territorial expansion maps to inequality charts—visual evidence of institutional failure across 250 years.
          </p>
        </ScrollReveal>

        {/* Theme Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {themes.map((theme, index) => {
            const figureCount = figures.filter(f => f.theme === theme.id).length
            return (
              <ThemeCard
                key={theme.id}
                theme={theme}
                figureCount={figureCount}
                index={index}
              />
            )
          })}
        </div>

        {/* Featured Quote */}
        <ScrollReveal delay={0.2} className="mt-20 max-w-4xl mx-auto text-center">
          <blockquote className="blockquote text-2xl lg:text-3xl text-center border-none pl-0">
            &ldquo;Geographic luck, not institutional design, explained American prosperity.&rdquo;
          </blockquote>
          <p className="mt-6 text-neutral-500 font-sans text-sm uppercase tracking-wider">
            — Chapter 5: Building an Empire
          </p>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3} className="text-center mt-12">
          <Link href="/figures" className="btn-primary btn-shine">
            Explore All Figures
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
