import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { chapters } from '@/lib/content/chapters'

export const metadata: Metadata = {
  title: 'About the Book',
  description: 'Designed to Fail: Why Americans Love Their Country and Hate Their Government. A groundbreaking analysis by Sven Steinmo and John D\'Attoma.',
}

const purchaseLinks = [
  { name: 'Yale University Press', url: '#', primary: true },
  { name: 'Amazon', url: '#' },
  { name: 'Barnes & Noble', url: '#' },
  { name: 'Bookshop.org', url: '#' },
  { name: 'IndieBound', url: '#' },
]

export default function BookPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-500 pt-32 pb-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="order-2 lg:order-1">
              <div className="max-w-md mx-auto relative">
                {/* Solid background to replace transparency */}
                <div className="absolute inset-0 bg-white rounded-lg" />
                <Image
                  src="/images/cover.png"
                  alt="Designed to Fail book cover showing American flag fragmenting over the Capitol building with citizens looking on"
                  width={600}
                  height={900}
                  className="rounded-lg shadow-hard w-full h-auto relative z-10"
                  priority
                  unoptimized
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary-500/20 text-secondary-400 font-sans font-semibold text-sm uppercase tracking-wider mb-6">
                Forthcoming 2026
              </span>
              <h1 className="font-serif text-display text-white mb-6">
                Designed to{' '}
                <span className="text-secondary-400">Fail</span>
              </h1>
              <p className="text-body-lg text-white/80 mb-4">
                Why Americans Love Their Country and Hate Their Government
              </p>
              <p className="text-body text-white/60 mb-8">
                By <strong className="text-white">Sven Steinmo</strong> &amp; <strong className="text-white">John D&apos;Attoma</strong>
              </p>

              {/* Book Details */}
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-white/50 mb-1">Publisher</div>
                  <div className="text-white font-semibold">Yale University Press</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-white/50 mb-1">Publication</div>
                  <div className="text-white font-semibold">Forthcoming 2026</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-white/50 mb-1">Pages</div>
                  <div className="text-white font-semibold">~350</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-white/50 mb-1">ISBN</div>
                  <div className="text-white font-semibold">Coming Soon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Thesis */}
      <section className="section bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="font-serif text-headline text-primary-500 mb-4">
              The Core Argument
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-body-lg text-neutral-700 leading-relaxed mb-8">
              The American political system isn&apos;t broken—<strong>it was designed this way</strong>. The Constitution&apos;s elaborate system of checks and balances wasn&apos;t created to empower democratic governance, but to limit it.
            </p>

            <blockquote className="blockquote my-12">
              &ldquo;The checks and balances are keystones of American democracy. But let us be clear: these institutions were specifically designed to be barriers to democracy.&rdquo;
            </blockquote>

            <p className="text-body-lg text-neutral-700 leading-relaxed mb-8">
              These 18th-century anti-majoritarian institutions, designed by elites fearful of popular rule, consistently produce gridlock, fuel cynicism, empower narrow interests, and fail to serve the democratic ideals Americans hold dear.
            </p>

            <p className="text-body-lg text-neutral-700 leading-relaxed">
              Through 12 chapters spanning 250 years of American history—from Shays&apos; Rebellion to Trump&apos;s rise—this book traces how constitutional design creates modern political dysfunction, and why Americans are right to distrust their government.
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-headline text-primary-500 mb-4">
              Table of Contents
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              12 chapters tracing the institutional origins of American political dysfunction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.map((chapter) => (
              <Link key={chapter.slug} href={`/chapters/${chapter.slug}`}>
                <div className="bg-white rounded-xl p-6 hover:shadow-medium hover:-translate-y-1 transition-all group">
                  <div className="text-4xl font-serif font-bold text-primary-500/20 group-hover:text-primary-500/40 transition-colors mb-2">
                    {chapter.number.toString().padStart(2, '0')}
                  </div>
                  <h3 className="font-serif text-lg text-primary-500 group-hover:text-accent-red transition-colors">
                    {chapter.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/chapters" className="btn-secondary">
              View Full Chapter Summaries
            </Link>
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section id="purchase" className="section bg-primary-500">
        <div className="container-custom text-center">
          <h2 className="font-serif text-headline text-white mb-4">
            Pre-Order Your Copy
          </h2>
          <p className="text-body-lg text-white/70 max-w-2xl mx-auto mb-10">
            Forthcoming 2026 from Yale University Press and all major booksellers.
          </p>

          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            {purchaseLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className={
                  link.primary
                    ? 'btn bg-secondary-500 text-primary-500 px-6 py-3 font-bold hover:bg-secondary-400 transition-colors'
                    : 'btn bg-white/10 text-white border border-white/20 px-6 py-3 hover:bg-white/20 transition-colors'
                }
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
