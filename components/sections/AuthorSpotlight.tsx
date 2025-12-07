'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { authors } from '@/lib/content/authors'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.15,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

function AuthorCard({ author, index }: { author: typeof authors[0]; index: number }) {
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
      <Link href={`/authors/${author.slug}`}>
        <div className="card-hover card-lift group h-full">
          {/* Author Image */}
          <div className="aspect-[4/3] bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
            {author.image ? (
              <Image
                src={author.image}
                alt={`${author.name} - ${author.role}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            )}
            {author.isMemorial && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-secondary-500 text-primary-500 text-xs font-semibold rounded-full">
                  In Memoriam
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            <h3 className="font-serif text-title text-primary-500 group-hover:text-accent-red transition-colors mb-1">
              {author.name}
            </h3>
            <p className="text-secondary-500 font-sans font-semibold text-sm mb-1">
              {author.role}
            </p>
            {author.years && (
              <p className="text-neutral-400 text-sm mb-4">
                {author.years}
              </p>
            )}
            <p className="text-body text-neutral-600 line-clamp-3">
              {author.shortBio}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function AuthorSpotlight() {
  return (
    <section className="section bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-serif text-display text-primary-500 mb-4">
            Meet the{' '}
            <span className="text-accent-red">Authors</span>
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            A collaboration between one of political science&apos;s most influential scholars and his longtime research partner.
          </p>
        </ScrollReveal>

        {/* Author Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {authors.map((author, index) => (
            <AuthorCard key={author.slug} author={author} index={index} />
          ))}
        </div>

        {/* Memorial Quote */}
        <ScrollReveal delay={0.3} className="mt-20 max-w-3xl mx-auto text-center">
          <blockquote className="blockquote text-xl lg:text-2xl text-center border-none pl-0 italic">
            &ldquo;Sven Steinmo spent his career showing us that institutions matter. But he also showed us that institutions are human creations, built through political struggle and sustained through political choice. They can be rebuilt.&rdquo;
          </blockquote>
          <p className="mt-6 text-neutral-500 font-sans text-sm">
            — From the dedication
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
