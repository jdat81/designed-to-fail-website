import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { authors } from '@/lib/content/authors'

export const metadata: Metadata = {
  title: 'Authors',
  description: 'Meet Sven Steinmo and John D\'Attoma, the authors of Designed to Fail.',
}

export default function AuthorsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-500 pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="font-serif text-display text-white mb-6">
              Meet the{' '}
              <span className="text-secondary-400">Authors</span>
            </h1>
            <p className="text-body-lg text-white/70">
              A collaboration between one of political science&apos;s most influential scholars and his longtime research partner, spanning decades of work on institutional design and democratic governance.
            </p>
          </div>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {authors.map((author) => (
              <Link key={author.slug} href={`/authors/${author.slug}`}>
                <div className="card-hover group h-full">
                  {/* Author Image */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
                    {author.image ? (
                      <Image
                        src={author.image}
                        alt={`${author.name} - ${author.role}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {author.isMemorial && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-secondary-500 text-primary-500 text-xs font-semibold rounded-full">
                          In Memoriam
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h2 className="font-serif text-headline text-primary-500 group-hover:text-accent-red transition-colors mb-2">
                      {author.name}
                    </h2>
                    <p className="text-secondary-500 font-sans font-semibold mb-1">
                      {author.role}
                    </p>
                    {author.years && (
                      <p className="text-neutral-400 text-sm mb-4">
                        {author.years}
                      </p>
                    )}
                    <p className="text-body text-neutral-600">
                      {author.shortBio}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-accent-red font-sans font-semibold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                      <span>Read Full Bio</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Memorial Quote */}
      <section className="section bg-white">
        <div className="container-narrow text-center">
          <blockquote className="blockquote text-2xl lg:text-3xl text-center border-none pl-0 italic">
            &ldquo;Sven Steinmo spent his career showing us that institutions matter. But he also showed us that institutions are human creations, built through political struggle and sustained through political choice. They can be rebuilt.&rdquo;
          </blockquote>
          <p className="mt-8 text-neutral-500 font-sans text-sm">
            — From the dedication
          </p>

          <div className="mt-12 pt-12 border-t border-neutral-200">
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              &ldquo;Designed to Fail&rdquo; represents the culmination of Sven Steinmo&apos;s lifelong inquiry into why Americans, despite being among the most egalitarian people in the world, live in one of the most unequal democracies. John D&apos;Attoma completed this manuscript after Steinmo&apos;s passing in July 2024, ensuring their shared vision reached readers.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
