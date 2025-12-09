import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { figures, getFigureBySlug } from '@/lib/content/figures'
import { chapters } from '@/lib/content/chapters'
import FigureVisualization from '@/components/visualizations/FigureVisualization'

interface FigurePageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return figures.map((figure) => ({
    slug: figure.slug,
  }))
}

export async function generateMetadata({ params }: FigurePageProps): Promise<Metadata> {
  const figure = getFigureBySlug(params.slug)

  if (!figure) {
    return { title: 'Figure Not Found' }
  }

  return {
    title: `Figure ${figure.number}: ${figure.caption}`,
    description: figure.context.substring(0, 160),
  }
}

const themeColors = {
  territory: 'bg-accent-red/10 text-accent-red border-accent-red/20',
  economy: 'bg-secondary-500/10 text-secondary-600 border-secondary-500/20',
  inequality: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
  trust: 'bg-neutral-200 text-neutral-700 border-neutral-300',
}

export default function FigurePage({ params }: FigurePageProps) {
  const figure = getFigureBySlug(params.slug)

  if (!figure) {
    notFound()
  }

  const relatedChapter = chapters.find(c => c.number === figure.chapter)
  const currentIndex = figures.findIndex(f => f.slug === figure.slug)
  const prevFigure = currentIndex > 0 ? figures[currentIndex - 1] : undefined
  const nextFigure = currentIndex < figures.length - 1 ? figures[currentIndex + 1] : undefined

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-500 pt-32 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/figures" className="hover:text-white transition-colors">Figures</Link></li>
              <li>/</li>
              <li className="text-white">Figure {figure.number}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-secondary-400 font-sans font-semibold text-sm uppercase tracking-wider">
                Figure {figure.number}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${themeColors[figure.theme]}`}>
                {figure.theme}
              </span>
            </div>
            <h1 className="font-serif text-display text-white mb-6">
              {figure.caption}
            </h1>
            {relatedChapter && (
              <p className="text-body-lg text-white/70">
                From Chapter {relatedChapter.number}: {relatedChapter.title}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Figure Display */}
      <section className="section bg-white">
        <div className="container-custom">
          {/* Interactive Visualization */}
          <FigureVisualization slug={figure.slug} />

          {/* Context */}
          <div className="container-narrow">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="font-serif text-headline text-primary-500 mb-6">
                Context &amp; Analysis
              </h2>
              <p className="text-body-lg text-neutral-700 leading-relaxed">
                {figure.context}
              </p>
            </div>


            {/* Related Chapter */}
            {relatedChapter && (
              <div className="mb-12">
                <h3 className="font-serif text-title text-primary-500 mb-6">
                  Related Chapter
                </h3>
                <Link href={`/chapters/${relatedChapter.slug}`}>
                  <div className="card-hover p-6 lg:p-8">
                    <div className="flex items-start gap-6">
                      <div className="text-4xl font-serif font-bold text-primary-500/20">
                        {relatedChapter.number.toString().padStart(2, '0')}
                      </div>
                      <div>
                        <h4 className="font-serif text-title text-primary-500 mb-2">
                          {relatedChapter.title}
                        </h4>
                        <p className="text-body text-neutral-600 line-clamp-2">
                          {relatedChapter.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Figure Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-neutral-200">
              {prevFigure ? (
                <Link
                  href={`/figures/${prevFigure.slug}`}
                  className="group flex items-center gap-3 text-neutral-600 hover:text-accent-red transition-colors"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <div>
                    <div className="text-sm text-neutral-400">Previous</div>
                    <div className="font-semibold">Figure {prevFigure.number}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              <Link
                href="/figures"
                className="px-4 py-2 bg-neutral-100 rounded-lg text-neutral-600 hover:bg-neutral-200 transition-colors font-semibold text-sm"
              >
                All Figures
              </Link>

              {nextFigure ? (
                <Link
                  href={`/figures/${nextFigure.slug}`}
                  className="group flex items-center gap-3 text-neutral-600 hover:text-accent-red transition-colors text-right"
                >
                  <div>
                    <div className="text-sm text-neutral-400">Next</div>
                    <div className="font-semibold">Figure {nextFigure.number}</div>
                  </div>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
