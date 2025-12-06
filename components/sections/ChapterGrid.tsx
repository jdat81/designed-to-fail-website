'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { chapters } from '@/lib/content/chapters'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.08,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

function ChapterCard({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
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
      <Link href={`/chapters/${chapter.slug}`}>
        <div className="card-hover card-lift group h-full">
          <div className="p-6 lg:p-8">
            {/* Chapter Number */}
            <div className="text-display font-serif font-bold text-primary-500/20 group-hover:text-primary-500/40 transition-colors mb-4">
              {chapter.number.toString().padStart(2, '0')}
            </div>

            {/* Title */}
            <h3 className="font-serif text-title text-primary-500 group-hover:text-accent-red transition-colors mb-4">
              {chapter.title}
            </h3>

            {/* Summary - truncated */}
            <p className="text-body text-neutral-600 line-clamp-3 mb-6">
              {chapter.summary}
            </p>

            {/* Read More */}
            <div className="flex items-center gap-2 text-accent-red font-sans font-semibold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
              <span>Read More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ChapterGrid() {
  return (
    <section className="section bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-serif text-display text-primary-500 mb-4">
            12 Chapters of{' '}
            <span className="text-accent-red">Discovery</span>
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            From the founding fathers&apos; fear of democracy to today&apos;s broken politics—a comprehensive analysis of institutional failure.
          </p>
        </ScrollReveal>

        {/* Chapter Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {chapters.map((chapter, index) => (
            <ChapterCard key={chapter.slug} chapter={chapter} index={index} />
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3} className="text-center mt-16">
          <Link href="/chapters" className="btn-secondary">
            View All Chapters
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
