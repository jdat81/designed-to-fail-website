import Link from 'next/link'
import { Metadata } from 'next'
import { chapters } from '@/lib/content/chapters'

export const metadata: Metadata = {
  title: 'Chapters',
  description: '12 chapters tracing 250 years of institutional failure in American democracy.',
}

export default function ChaptersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-500 pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="font-serif text-display text-white mb-6">
              Table of{' '}
              <span className="text-secondary-400">Contents</span>
            </h1>
            <p className="text-body-lg text-white/70">
              From the founding fathers&apos; fear of democracy to Trump&apos;s rise—12 chapters examining how institutional design created modern American dysfunction.
            </p>
          </div>
        </div>
      </section>

      {/* Chapters List */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="space-y-6">
            {chapters.map((chapter) => (
              <Link key={chapter.slug} href={`/chapters/${chapter.slug}`}>
                <div className="card-hover group p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Chapter Number */}
                    <div className="text-display font-serif font-bold text-primary-500/20 group-hover:text-primary-500/40 transition-colors lg:w-24 flex-shrink-0">
                      {chapter.number.toString().padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="font-serif text-title text-primary-500 group-hover:text-accent-red transition-colors mb-3">
                        {chapter.title}
                      </h2>
                      <p className="text-body text-neutral-600 mb-4">
                        {chapter.summary}
                      </p>

                      {/* Key Arguments Preview */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {chapter.keyArguments.slice(0, 2).map((arg, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full"
                          >
                            {arg.length > 60 ? arg.substring(0, 60) + '...' : arg}
                          </span>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-sm text-neutral-500">
                        <span>{chapter.wordCount.toLocaleString()} words</span>
                        {chapter.relatedFigures.length > 0 && (
                          <span>{chapter.relatedFigures.length} figures</span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex items-center text-accent-red opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-tight bg-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-headline text-primary-500 mb-4">
            Ready to dive deeper?
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-xl mx-auto mb-8">
            Pre-order your copy and explore the full analysis of American institutional failure.
          </p>
          <Link href="/book#purchase" className="btn-primary">
            Pre-Order Now
          </Link>
        </div>
      </section>
    </>
  )
}
