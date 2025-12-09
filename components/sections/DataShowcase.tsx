'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { figures } from '@/lib/content/figures'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

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

function FigureCard({ figure, index }: { figure: typeof figures[0]; index: number }) {
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
      <Link href={`/figures/${figure.slug}`}>
        <div className="card-hover card-lift group h-full overflow-hidden">
          {/* Figure Image */}
          <div className="relative aspect-[4/3] bg-neutral-100">
            <Image
              src={figure.image}
              alt={figure.caption}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-primary-500/90 text-white text-xs font-semibold rounded-full">
                Figure {figure.number}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-serif text-lg text-primary-500 group-hover:text-accent-red transition-colors mb-2 line-clamp-2">
              {figure.caption}
            </h3>
            <p className="text-sm text-neutral-600 line-clamp-3">
              {figure.context}
            </p>
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
            Key Figures From the{' '}
            <span className="text-accent-red">Book</span>
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            From territorial expansion maps to inequality charts—visual evidence of institutional failure across 250 years.
          </p>
        </ScrollReveal>

        {/* Figures Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {figures.map((figure, index) => (
            <FigureCard
              key={figure.slug}
              figure={figure}
              index={index}
            />
          ))}
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
