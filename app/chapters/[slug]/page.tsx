import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { chapters, getChapterBySlug } from '@/lib/content/chapters'
import { figures } from '@/lib/content/figures'

interface ChapterPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }))
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const chapter = getChapterBySlug(params.slug)

  if (!chapter) {
    return { title: 'Chapter Not Found' }
  }

  return {
    title: `Chapter ${chapter.number}: ${chapter.title}`,
    description: chapter.summary.substring(0, 160),
  }
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const chapter = getChapterBySlug(params.slug)

  if (!chapter) {
    notFound()
  }

  const relatedFiguresList = chapter.relatedFigures
    .map(figNum => figures.find(f => f.number === figNum))
    .filter(Boolean)

  const prevChapter = chapters.find(c => c.number === chapter.number - 1)
  const nextChapter = chapters.find(c => c.number === chapter.number + 1)

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
              <li><Link href="/chapters" className="hover:text-white transition-colors">Chapters</Link></li>
              <li>/</li>
              <li className="text-white">Chapter {chapter.number}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="text-secondary-400 font-sans font-semibold text-sm uppercase tracking-wider mb-4">
              Chapter {chapter.number}
            </div>
            <h1 className="font-serif text-display text-white mb-6">
              {chapter.title}
            </h1>
            <p className="text-body-lg text-white/70">
              {chapter.wordCount.toLocaleString()} words
              {relatedFiguresList.length > 0 && ` • ${relatedFiguresList.length} figures`}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section bg-white">
        <div className="container-narrow">
          {/* Summary */}
          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              {chapter.summary}
            </p>
          </div>

          {/* Key Arguments */}
          <div className="mb-16">
            <h2 className="font-serif text-headline text-primary-500 mb-8">
              Key Arguments
            </h2>
            <div className="space-y-4">
              {chapter.keyArguments.map((arg, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 bg-neutral-50 rounded-xl"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-red/10 text-accent-red flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="text-body text-neutral-700">{arg}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Figures */}
          {relatedFiguresList.length > 0 && (
            <div className="mb-16">
              <h2 className="font-serif text-headline text-primary-500 mb-8">
                Data &amp; Visualizations
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedFiguresList.map((figure) => figure && (
                  <Link key={figure.slug} href={`/figures/${figure.slug}`}>
                    <div className="card-hover p-6">
                      <div className="text-secondary-500 font-sans font-semibold text-sm mb-2">
                        Figure {figure.number}
                      </div>
                      <h3 className="font-serif text-title text-primary-500 mb-2">
                        {figure.caption}
                      </h3>
                      <p className="text-body text-neutral-600 line-clamp-2">
                        {figure.context}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-neutral-50 rounded-2xl p-8 lg:p-12 text-center mb-16">
            <h3 className="font-serif text-title text-primary-500 mb-4">
              Read the full chapter in the book
            </h3>
            <p className="text-body text-neutral-600 mb-8 max-w-lg mx-auto">
              This chapter preview covers key arguments. Get the complete analysis with all the evidence and context in the full book.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book#purchase" className="btn-primary">
                Pre-Order Now
              </Link>
              <Link href="/book" className="btn-secondary">
                Learn More About the Book
              </Link>
            </div>
          </div>

          {/* Chapter Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-neutral-200">
            {prevChapter ? (
              <Link
                href={`/chapters/${prevChapter.slug}`}
                className="group flex items-center gap-3 text-neutral-600 hover:text-accent-red transition-colors"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <div>
                  <div className="text-sm text-neutral-400">Previous</div>
                  <div className="font-semibold">Chapter {prevChapter.number}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextChapter ? (
              <Link
                href={`/chapters/${nextChapter.slug}`}
                className="group flex items-center gap-3 text-neutral-600 hover:text-accent-red transition-colors text-right"
              >
                <div>
                  <div className="text-sm text-neutral-400">Next</div>
                  <div className="font-semibold">Chapter {nextChapter.number}</div>
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
      </section>
    </>
  )
}
