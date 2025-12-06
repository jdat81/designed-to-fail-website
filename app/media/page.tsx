import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media Kit',
  description: 'Press resources, author photos, book covers, and media inquiries for Designed to Fail.',
}

const pressAssets = [
  {
    title: 'Book Cover (High Resolution)',
    description: 'Print-quality book cover image (300 DPI)',
    format: 'PNG, JPG',
    size: '~5MB',
  },
  {
    title: 'Author Photos',
    description: 'Professional headshots of Sven Steinmo and John D\'Attoma',
    format: 'PNG, JPG',
    size: '~2MB each',
  },
  {
    title: 'Press Release',
    description: 'Official announcement and book summary for media',
    format: 'PDF',
    size: '~200KB',
  },
  {
    title: 'One-Pager',
    description: 'Quick reference with key facts, quotes, and talking points',
    format: 'PDF',
    size: '~500KB',
  },
]

const talkingPoints = [
  {
    topic: 'The Core Thesis',
    point: 'American government dysfunction isn\'t a bug—it\'s a feature. The Constitution was designed to limit democracy, not empower it.',
  },
  {
    topic: 'Historical Institutionalism',
    point: 'Steinmo coined this term to explain how institutions created centuries ago continue to shape political possibilities today.',
  },
  {
    topic: 'Why Americans Distrust Government',
    point: 'Americans aren\'t uniquely anti-government. They\'re uniquely disappointed because their institutions consistently fail to deliver what they want.',
  },
  {
    topic: 'Comparative Perspective',
    point: 'When compared to other democracies, American institutions uniquely empower minorities to block majorities—explaining policy gridlock.',
  },
  {
    topic: 'Trump\'s Rise',
    point: 'The 2016 election wasn\'t an anomaly—it was a predictable consequence of decades of institutional failure and mounting public frustration.',
  },
]

export default function MediaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-500 pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="font-serif text-display text-white mb-6">
              Media{' '}
              <span className="text-secondary-400">Kit</span>
            </h1>
            <p className="text-body-lg text-white/70">
              Press resources, downloadable assets, and contact information for journalists and media professionals covering &ldquo;Designed to Fail.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-headline text-primary-500 mb-6">
                Press Contact
              </h2>
              <p className="text-body text-neutral-600 mb-8">
                For interview requests, review copies, and media inquiries, please contact Yale University Press publicity.
              </p>
              <div className="bg-neutral-50 rounded-xl p-6">
                <div className="font-semibold text-primary-500 mb-2">
                  Yale University Press
                </div>
                <div className="text-neutral-600 mb-4">
                  Publicity Department
                </div>
                <a href="mailto:publicity@yale.edu" className="text-accent-red hover:underline">
                  publicity@yale.edu
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-headline text-primary-500 mb-6">
                Book Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="text-neutral-500">Title</span>
                  <span className="text-primary-500 font-semibold">Designed to Fail</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="text-neutral-500">Subtitle</span>
                  <span className="text-neutral-700 text-right">Why Americans Love Their Country and Hate Their Government</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="text-neutral-500">Authors</span>
                  <span className="text-neutral-700">Sven Steinmo &amp; John D&apos;Attoma</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="text-neutral-500">Publisher</span>
                  <span className="text-neutral-700">Yale University Press</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="text-neutral-500">Publication Date</span>
                  <span className="text-neutral-700">August 15, 2025</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="text-neutral-500">Pages</span>
                  <span className="text-neutral-700">~350</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-neutral-500">ISBN</span>
                  <span className="text-neutral-700">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Assets */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <h2 className="font-serif text-headline text-primary-500 mb-4 text-center">
            Downloadable Assets
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto mb-12 text-center">
            High-resolution images and documents for press use.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pressAssets.map((asset, i) => (
              <div key={i} className="bg-white rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-500 mb-1">
                    {asset.title}
                  </h3>
                  <p className="text-body text-neutral-600 mb-2">
                    {asset.description}
                  </p>
                  <div className="text-sm text-neutral-400">
                    {asset.format} &bull; {asset.size}
                  </div>
                </div>
                <button className="px-4 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors text-sm font-semibold">
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Talking Points */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="font-serif text-headline text-primary-500 mb-4 text-center">
            Key Talking Points
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto mb-12 text-center">
            Core themes and arguments from &ldquo;Designed to Fail&rdquo; for interviews and coverage.
          </p>

          <div className="space-y-6 max-w-3xl mx-auto">
            {talkingPoints.map((item, i) => (
              <div key={i} className="flex gap-6 p-6 bg-neutral-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-red/10 text-accent-red flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-primary-500 mb-2">
                    {item.topic}
                  </h3>
                  <p className="text-body text-neutral-600">
                    {item.point}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Coverage */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <h2 className="font-serif text-headline text-primary-500 mb-4 text-center">
            Sample Angles
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto mb-12 text-center">
            Story ideas for journalists covering the book.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6">
              <div className="text-secondary-500 font-semibold text-sm uppercase tracking-wider mb-3">
                Political Analysis
              </div>
              <h3 className="font-serif text-title text-primary-500 mb-3">
                &ldquo;The Founders Feared Democracy—And We&apos;re Living With the Consequences&rdquo;
              </h3>
              <p className="text-body text-neutral-600">
                How 18th-century anti-majoritarian design explains 21st-century gridlock.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="text-secondary-500 font-semibold text-sm uppercase tracking-wider mb-3">
                Human Interest
              </div>
              <h3 className="font-serif text-title text-primary-500 mb-3">
                &ldquo;A Scholar&apos;s Final Gift: Completing His Mentor&apos;s Last Book&rdquo;
              </h3>
              <p className="text-body text-neutral-600">
                John D&apos;Attoma finished &ldquo;Designed to Fail&rdquo; after Sven Steinmo&apos;s death in 2024.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="text-secondary-500 font-semibold text-sm uppercase tracking-wider mb-3">
                2024 Election
              </div>
              <h3 className="font-serif text-title text-primary-500 mb-3">
                &ldquo;Why Your Vote Might Not Matter As Much As You Think&rdquo;
              </h3>
              <p className="text-body text-neutral-600">
                Electoral College, Senate apportionment, and other ways institutions override majorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-500">
        <div className="container-custom text-center">
          <h2 className="font-serif text-headline text-white mb-4">
            Request a Review Copy
          </h2>
          <p className="text-body-lg text-white/70 max-w-2xl mx-auto mb-8">
            Media professionals can request advance review copies through Yale University Press.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:publicity@yale.edu" className="btn bg-secondary-500 text-primary-500 px-8 py-3 font-bold hover:bg-secondary-400 transition-colors">
              Contact Publicity
            </a>
            <Link href="/book" className="btn bg-white/10 text-white border border-white/20 px-8 py-3 hover:bg-white/20 transition-colors">
              Learn More About the Book
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
