'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

// Animated counter component with framer-motion integration
function AnimatedCounter({
  target,
  duration = 2000,
  suffix = '',
  prefix = ''
}: {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

// Key statistics from the book that drive the narrative
const stats = [
  { number: 73, suffix: '%', label: 'Trusted Gov\'t in 1958', highlight: false },
  { number: 14, suffix: '%', label: 'Trust Gov\'t Today', highlight: true },
  { number: 250, suffix: '+', label: 'Years of Design', highlight: false },
  { number: 12, suffix: '', label: 'Critical Chapters', highlight: false },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-primary-500 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700" />

      {/* Content */}
      <div className="relative container-custom py-32 lg:py-40">
        <motion.div
          className="max-w-5xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-secondary-400 animate-pulse" />
            <span className="text-white/90 text-sm font-sans font-medium">
              Yale University Press • August 2025
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-display-xl text-white mb-6"
          >
            Designed to{' '}
            <span className="text-secondary-400">Fail</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="font-serif text-headline text-white/80 mb-8 max-w-3xl"
          >
            Why Americans Love Their Country and Hate Their Government
          </motion.p>

          {/* Core Thesis */}
          <motion.p
            variants={itemVariants}
            className="text-body-lg text-white/70 mb-12 max-w-2xl leading-relaxed"
          >
            <span className="text-secondary-400 font-semibold">The system isn&apos;t broken</span>—it was designed this way.
            A groundbreaking analysis of how 18th-century constitutional design creates modern political dysfunction.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <Link
              href="/book#purchase"
              className="btn-primary btn-shine text-center"
            >
              Pre-Order Now
            </Link>
            <Link
              href="/chapters"
              className="btn bg-transparent border-2 border-white/30 text-white px-8 py-4 text-lg hover:bg-white/10 hover:border-white/50 text-center transition-all duration-300"
            >
              Explore Chapters
            </Link>
          </motion.div>

          {/* Stats - Conversion Code Style with emphasis on trust decline */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-white/10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={statsVariants}
                custom={index}
                className={cn(
                  'text-center lg:text-left p-4 rounded-xl transition-all duration-300',
                  stat.highlight && 'bg-accent-red/20 border border-accent-red/30'
                )}
              >
                <div className={cn(
                  'text-display font-serif font-bold mb-2',
                  stat.highlight ? 'text-accent-red' : 'text-white'
                )}>
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} duration={stat.highlight ? 2500 : 2000} />
                </div>
                <div className={cn(
                  'text-small font-sans font-semibold uppercase tracking-wider',
                  stat.highlight ? 'text-accent-red/80' : 'text-white/50'
                )}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <svg
            className="w-6 h-6 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
