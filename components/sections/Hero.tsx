'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

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

// Key statistics from the book that drive the narrative - Gallup Confidence in Institutions
const stats = [
  { number: 73, suffix: '%', label: 'Trusted Gov\'t in 1958', highlight: false },
  { number: 14, suffix: '%', label: 'Trust Gov\'t Today', highlight: true },
  { number: 42, suffix: '%', label: 'Trusted Congress in 1973', highlight: false },
  { number: 9, suffix: '%', label: 'Trust Congress Today', highlight: true },
  { number: 56, suffix: '%', label: 'Trusted Supreme Court in 1988', highlight: false },
  { number: 30, suffix: '%', label: 'Trust Supreme Court Today', highlight: true },
  { number: 52, suffix: '%', label: 'Trusted Presidency in 1975', highlight: false },
  { number: 26, suffix: '%', label: 'Trust Presidency Today', highlight: true },
  { number: 46, suffix: '%', label: 'Trusted TV News in 1993', highlight: false },
  { number: 11, suffix: '%', label: 'Trust TV News Today', highlight: true },
  { number: 34, suffix: '%', label: 'Trusted Big Business in 1975', highlight: false },
  { number: 16, suffix: '%', label: 'Trust Big Business Today', highlight: true },
  { number: 34, suffix: '%', label: 'Trusted Criminal Justice in 2004', highlight: false },
  { number: 17, suffix: '%', label: 'Trust Criminal Justice Today', highlight: true },
  { number: 51, suffix: '%', label: 'Trusted Newspapers in 1979', highlight: false },
  { number: 17, suffix: '%', label: 'Trust Newspapers Today', highlight: true },
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          className="max-w-xl"
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
              Yale University Press • Forthcoming 2026
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

          {/* Stats - Institutional Trust Decline */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-white/10"
          >
            {/* Group stats in pairs (then/now) */}
            {[0, 2, 4, 6, 8, 10, 12, 14].map((pairIndex) => (
              <div key={pairIndex} className="text-center">
                {/* Institution name */}
                <div className="text-xs font-sans font-semibold uppercase tracking-wider text-white/60 mb-3">
                  {pairIndex === 0 ? "Gov't" : pairIndex === 2 ? 'Congress' : pairIndex === 4 ? 'Supreme Court' : pairIndex === 6 ? 'Presidency' : pairIndex === 8 ? 'TV News' : pairIndex === 10 ? 'Big Business' : pairIndex === 12 ? 'Criminal Justice' : 'Newspapers'}
                </div>
                {/* Then stat */}
                <div className="text-white text-2xl font-serif font-bold">
                  <AnimatedCounter target={stats[pairIndex].number} suffix="%" duration={2000} />
                </div>
                <div className="text-white/40 text-xs mb-2">
                  {pairIndex === 0 ? '1958' : pairIndex === 2 ? '1973' : pairIndex === 4 ? '1988' : pairIndex === 6 ? '1975' : pairIndex === 8 ? '1993' : pairIndex === 10 ? '1975' : pairIndex === 12 ? '2004' : '1979'}
                </div>
                {/* Arrow */}
                <div className="text-white/30 text-sm mb-2">↓</div>
                {/* Now stat */}
                <div className="text-accent-red text-2xl font-serif font-bold">
                  <AnimatedCounter target={stats[pairIndex + 1].number} suffix="%" duration={2500} />
                </div>
                <div className="text-accent-red/60 text-xs">Today</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Book Cover */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden lg:flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Shadow/Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-br from-secondary-400/20 to-accent-red/20 rounded-2xl blur-2xl" />

            {/* Book Cover Image */}
            <div className="relative">
              {/* White background to replace transparency */}
              <div className="absolute inset-0 bg-white rounded-lg z-0" />
              <Image
                src="/images/cover.png"
                alt="Designed to Fail book cover - American flag fragmenting over the Capitol building"
                width={500}
                height={750}
                className="rounded-lg shadow-hard relative z-10 max-w-full h-auto"
                priority
                unoptimized
                style={{ backgroundColor: '#ffffff' }}
              />

              {/* Decorative Badge */}
              <div className="absolute -top-4 -right-4 z-20">
                <div className="bg-secondary-500 text-primary-500 px-4 py-2 rounded-full font-sans font-bold text-sm shadow-medium">
                  Forthcoming 2026
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
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
