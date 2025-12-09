import Link from 'next/link'
import NewsletterForm from '@/components/forms/NewsletterForm'

const footerLinks = {
  book: [
    { label: 'About the Book', href: '/book' },
    { label: 'Table of Contents', href: '/chapters' },
    { label: 'Key Figures', href: '/figures' },
    { label: 'Purchase', href: '/book#purchase' },
  ],
  authors: [
    { label: 'Sven Steinmo', href: '/authors/sven-steinmo' },
    { label: 'John D\'Attoma', href: '/authors/john-dattoma' },
  ],
  resources: [
    { label: 'Media Kit', href: '/media' },
    { label: 'Events', href: '/events' },
    { label: 'Contact', href: '/contact' },
    { label: 'Teaching Resources', href: '/resources' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-primary-500 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold text-white">
              Designed to Fail
            </Link>
            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              Why Americans Love Their Country and Hate Their Government
            </p>
            <p className="mt-4 text-white/50 text-sm">
              By Sven Steinmo &amp; John D&apos;Attoma
            </p>
            <p className="mt-2 text-secondary-400 text-sm font-semibold">
              Yale University Press • Forthcoming 2026
            </p>
          </div>

          {/* Book Links */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-secondary-400 mb-4">
              The Book
            </h3>
            <ul className="space-y-3">
              {footerLinks.book.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Authors */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-secondary-400 mb-4">
              Authors
            </h3>
            <ul className="space-y-3">
              {footerLinks.authors.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-secondary-400 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="max-w-xl">
            <h3 className="font-serif text-xl font-bold text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Get notified about book events, author appearances, and updates.
            </p>
<NewsletterForm variant="footer" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} Designed to Fail. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/50 hover:text-white text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-white text-xs transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
