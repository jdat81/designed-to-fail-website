'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export default function FinalCTA() {
  return (
    <section className="section bg-primary-500 text-white">
      <div className="container-custom text-center">
        <ScrollReveal>
          <h2 className="font-serif text-display text-white mb-6">
            Ready to Understand{' '}
            <span className="text-secondary-400">Why</span>?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-body-lg text-white/70 max-w-2xl mx-auto mb-10">
            Pre-order your copy of &ldquo;Designed to Fail&rdquo; and discover how 250 years of institutional design created modern American dysfunction.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book#purchase"
              className="btn bg-secondary-500 text-primary-500 px-8 py-4 text-lg font-bold hover:bg-secondary-400 transition-colors btn-shine"
            >
              Pre-Order Now
            </Link>
            <Link
              href="/media"
              className="btn bg-transparent border-2 border-white/30 text-white px-8 py-4 text-lg font-bold hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              Media Inquiries
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
