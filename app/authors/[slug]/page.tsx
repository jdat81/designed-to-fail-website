import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { authors, getAuthorBySlug } from '@/lib/content/authors'

interface AuthorPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = getAuthorBySlug(params.slug)

  if (!author) {
    return { title: 'Author Not Found' }
  }

  return {
    title: author.name,
    description: author.shortBio.substring(0, 160),
  }
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthorBySlug(params.slug)

  if (!author) {
    notFound()
  }

  const otherAuthor = authors.find(a => a.slug !== author.slug)

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
              <li><Link href="/authors" className="hover:text-white transition-colors">Authors</Link></li>
              <li>/</li>
              <li className="text-white">{author.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Author Photo Placeholder */}
            <div className="lg:col-span-1">
              <div className="aspect-square bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="w-40 h-40 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {author.isMemorial && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-secondary-500 text-primary-500 text-xs font-semibold rounded-full">
                      In Memoriam
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Author Info */}
            <div className="lg:col-span-2">
              <h1 className="font-serif text-display text-white mb-4">
                {author.name}
              </h1>
              <p className="text-secondary-400 font-sans font-semibold text-lg mb-2">
                {author.role}
              </p>
              {author.years && (
                <p className="text-white/50 mb-6">
                  {author.years}
                </p>
              )}
              <p className="text-body-lg text-white/80 mb-8">
                {author.shortBio}
              </p>

              {/* Credentials */}
              <div className="flex flex-wrap gap-2">
                {author.credentials.map((credential, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full"
                  >
                    {credential}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Biography */}
      <section className="section bg-white">
        <div className="container-narrow">
          <h2 className="font-serif text-headline text-primary-500 mb-8">
            Biography
          </h2>
          <div className="prose prose-lg max-w-none">
            {author.fullBio.map((paragraph, i) => (
              <p key={i} className="text-body-lg text-neutral-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Works */}
      <section className="section bg-neutral-50">
        <div className="container-narrow">
          <h2 className="font-serif text-headline text-primary-500 mb-8">
            Notable Works
          </h2>
          <div className="space-y-4">
            {author.notableWorks.map((work, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="text-4xl font-serif font-bold text-primary-500/20 md:w-20 flex-shrink-0">
                  {work.year}
                </div>
                <div>
                  <h3 className="font-serif text-title text-primary-500 mb-1">
                    {work.title}
                  </h3>
                  <p className="text-body text-neutral-600">
                    {work.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      {author.quotes.length > 0 && (
        <section className="section bg-white">
          <div className="container-narrow">
            <h2 className="font-serif text-headline text-primary-500 mb-8">
              In Their Words
            </h2>
            <div className="space-y-8">
              {author.quotes.map((quote, i) => (
                <blockquote
                  key={i}
                  className="blockquote text-xl lg:text-2xl"
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Memorial Section (for Steinmo) */}
      {author.isMemorial && (
        <section className="section bg-primary-500">
          <div className="container-narrow text-center">
            <h2 className="font-serif text-headline text-white mb-6">
              Remembering {author.name.split(' ')[0]}
            </h2>
            <p className="text-body-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {author.name} spent his career showing us that institutions matter. But he also showed us that institutions are human creations, built through political struggle and sustained through political choice. They can be rebuilt.
            </p>
            <p className="text-white/60">
              &ldquo;Designed to Fail&rdquo; is his final contribution to our understanding of American democracy—a gift to readers who want to know why their government so often disappoints them.
            </p>
          </div>
        </section>
      )}

      {/* Other Author */}
      {otherAuthor && (
        <section className="section bg-neutral-50">
          <div className="container-narrow">
            <h2 className="font-serif text-headline text-primary-500 mb-8 text-center">
              Co-Author
            </h2>
            <Link href={`/authors/${otherAuthor.slug}`}>
              <div className="card-hover p-8 flex flex-col md:flex-row items-center gap-6">
                {/* Photo Placeholder */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-title text-primary-500 mb-1">
                    {otherAuthor.name}
                  </h3>
                  <p className="text-secondary-500 font-semibold mb-2">
                    {otherAuthor.role}
                  </p>
                  <p className="text-body text-neutral-600">
                    {otherAuthor.shortBio.substring(0, 150)}...
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-tight bg-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-headline text-primary-500 mb-4">
            Read Their Work
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-xl mx-auto mb-8">
            Explore &ldquo;Designed to Fail&rdquo; and understand why American democracy struggles to deliver what its citizens want.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book#purchase" className="btn-primary">
              Pre-Order Now
            </Link>
            <Link href="/chapters" className="btn-secondary">
              Preview Chapters
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
