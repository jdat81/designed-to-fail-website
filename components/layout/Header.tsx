'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

const navLinks = [
  { label: 'The Book', href: '/book' },
  { label: 'Chapters', href: '/chapters' },
  { label: 'Figures', href: '/figures' },
  { label: 'Authors', href: '/authors' },
  { label: 'Media', href: '/media' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft py-3'
          : 'bg-transparent py-6'
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'font-serif font-bold transition-all duration-300',
              isScrolled ? 'text-xl text-primary-500' : 'text-2xl text-white'
            )}
          >
            Designed to Fail
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-sans text-sm font-semibold uppercase tracking-wider transition-all duration-200',
                  isScrolled
                    ? pathname === link.href
                      ? 'text-accent-red'
                      : 'text-neutral-700 hover:text-accent-red'
                    : pathname === link.href
                      ? 'text-secondary-400'
                      : 'text-white/90 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/book#purchase"
              className={cn(
                'btn font-sans font-bold uppercase tracking-wider text-sm px-6 py-3 rounded-lg transition-all duration-300',
                isScrolled
                  ? 'bg-accent-red text-white hover:bg-accent-red-light hover:-translate-y-0.5 hover:shadow-medium'
                  : 'bg-white text-primary-500 hover:bg-secondary-400 hover:text-primary-500'
              )}
            >
              Buy the Book
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 transition-colors',
              isScrolled ? 'text-primary-500' : 'text-white'
            )}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          )}
        >
          <div className={cn(
            'py-4 space-y-4 rounded-lg',
            isScrolled ? 'bg-neutral-50' : 'bg-white/10 backdrop-blur-md'
          )}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-4 py-2 font-sans font-semibold uppercase tracking-wider text-sm transition-colors',
                  isScrolled
                    ? pathname === link.href
                      ? 'text-accent-red'
                      : 'text-neutral-700 hover:text-accent-red'
                    : 'text-white hover:text-secondary-400'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link
                href="/book#purchase"
                className="btn-primary w-full text-center block"
              >
                Buy the Book
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
