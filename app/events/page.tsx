import Link from 'next/link'
import { Metadata } from 'next'
import NewsletterForm from '@/components/forms/NewsletterForm'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Book launch events, speaking engagements, and academic presentations for Designed to Fail.',
}

const upcomingEvents = [
  {
    date: '2026',
    title: 'Book Launch Event',
    location: 'New Haven, CT',
    venue: 'Yale University',
    type: 'Launch',
    description: 'Official launch event hosted by Yale University Press with keynote address by John D\'Attoma.',
  },
  {
    date: '2026',
    title: 'American Political Science Association Annual Meeting',
    location: 'TBA',
    venue: 'APSA Conference',
    type: 'Academic',
    description: 'Panel discussion on institutional design and democratic dysfunction.',
  },
  {
    date: '2026',
    title: 'University Lecture Series',
    location: 'Various',
    venue: 'Multiple Universities',
    type: 'Speaking',
    description: 'Academic lecture tour at leading political science departments.',
  },
]

const eventTypes = {
  Launch: 'bg-accent-red/10 text-accent-red',
  Academic: 'bg-primary-500/10 text-primary-500',
  Speaking: 'bg-secondary-500/10 text-secondary-600',
  Media: 'bg-neutral-200 text-neutral-700',
}

export default function EventsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-500 pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="font-serif text-display text-white mb-6">
              Events &amp;{' '}
              <span className="text-secondary-400">Speaking</span>
            </h1>
            <p className="text-body-lg text-white/70">
              Book launches, academic conferences, university lectures, and media appearances featuring &ldquo;Designed to Fail.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <h2 className="font-serif text-headline text-primary-500 mb-4 text-center">
            Upcoming Events
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto mb-12 text-center">
            Join us for book launches, lectures, and discussions about American institutional design.
          </p>

          <div className="space-y-6 max-w-4xl mx-auto">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="bg-white rounded-xl p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Date */}
                  <div className="lg:w-32 flex-shrink-0">
                    <div className="text-secondary-500 font-semibold">
                      {event.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-serif text-title text-primary-500">
                        {event.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${eventTypes[event.type as keyof typeof eventTypes]}`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {event.venue}
                      </span>
                    </div>
                    <p className="text-body text-neutral-600">
                      {event.description}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="lg:w-40 flex-shrink-0 flex lg:justify-end">
                    <button className="px-6 py-2 bg-neutral-100 text-neutral-500 rounded-lg font-semibold text-sm cursor-not-allowed">
                      Details Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="font-serif text-headline text-primary-500 mb-4 text-center">
            Speaking Topics
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto mb-12 text-center">
            Available lecture and presentation topics from &ldquo;Designed to Fail.&rdquo;
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-serif text-title text-primary-500 mb-3">
                Why America Was Designed to Fail
              </h3>
              <p className="text-body text-neutral-600 mb-4">
                The core thesis: How 18th-century constitutional design creates 21st-century dysfunction.
              </p>
              <div className="text-sm text-neutral-400">
                45-60 minutes
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-serif text-title text-primary-500 mb-3">
                Historical Institutionalism 101
              </h3>
              <p className="text-body text-neutral-600 mb-4">
                Introduction to the theoretical framework for understanding how institutions shape politics.
              </p>
              <div className="text-sm text-neutral-400">
                60-90 minutes (academic)
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-serif text-title text-primary-500 mb-3">
                Comparative Democracy
              </h3>
              <p className="text-body text-neutral-600 mb-4">
                How American institutions compare to other democracies—and why the differences matter.
              </p>
              <div className="text-sm text-neutral-400">
                45-60 minutes
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-serif text-title text-primary-500 mb-3">
                The Founding Fathers&apos; Fear of Democracy
              </h3>
              <p className="text-body text-neutral-600 mb-4">
                How elite concerns about popular rule shaped the Constitution—and still shape us today.
              </p>
              <div className="text-sm text-neutral-400">
                45-60 minutes
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-serif text-title text-primary-500 mb-3">
                From Shays&apos; Rebellion to Trump
              </h3>
              <p className="text-body text-neutral-600 mb-4">
                250 years of institutional failure and the populist responses it generates.
              </p>
              <div className="text-sm text-neutral-400">
                60-75 minutes
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-serif text-title text-primary-500 mb-3">
                Sven Steinmo&apos;s Legacy
              </h3>
              <p className="text-body text-neutral-600 mb-4">
                A tribute to one of political science&apos;s most influential scholars and his final work.
              </p>
              <div className="text-sm text-neutral-400">
                30-45 minutes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Inquiry */}
      <section className="section bg-neutral-50">
        <div className="container-narrow">
          <div className="bg-white rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="font-serif text-headline text-primary-500 mb-4">
              Book a Speaking Engagement
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-xl mx-auto mb-8">
              Interested in hosting a lecture, panel discussion, or book event? Contact us to discuss availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
              <Link href="/media" className="btn-secondary">
                View Media Kit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section bg-primary-500">
        <div className="container-custom text-center">
          <h2 className="font-serif text-headline text-white mb-4">
            Stay Updated on Events
          </h2>
          <p className="text-body-lg text-white/70 max-w-2xl mx-auto mb-8">
            Sign up to receive notifications about upcoming book events and speaking engagements.
          </p>
<NewsletterForm variant="standalone" />
        </div>
      </section>
    </>
  )
}
