'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useToast } from '@/components/ui/Toast'

const inquiryTypes = [
  { value: 'media', label: 'Media Inquiry' },
  { value: 'speaking', label: 'Speaking Engagement' },
  { value: 'academic', label: 'Academic Inquiry' },
  { value: 'general', label: 'General Question' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setIsSubmitted(true)
      addToast({
        type: 'success',
        title: 'Message sent!',
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      })
    } catch (error) {
      console.error('Contact form error:', error)
      addToast({
        type: 'error',
        title: 'Failed to send message',
        description: 'Please try again or email us directly.',
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-500 pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="font-serif text-display text-white mb-6">
              Get in{' '}
              <span className="text-secondary-400">Touch</span>
            </h1>
            <p className="text-body-lg text-white/70">
              Questions about the book? Interested in a speaking engagement? Media inquiry? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 lg:p-10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="font-serif text-headline text-primary-500 mb-4">
                      Message Sent
                    </h2>
                    <p className="text-body text-neutral-600 mb-8">
                      Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormData({
                          name: '',
                          email: '',
                          organization: '',
                          inquiryType: '',
                          message: '',
                        })
                      }}
                      className="btn-secondary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-headline text-primary-500 mb-8">
                      Send a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="organization" className="block text-sm font-semibold text-neutral-700 mb-2">
                            Organization
                          </label>
                          <input
                            type="text"
                            id="organization"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="University, publication, etc."
                          />
                        </div>
                        <div>
                          <label htmlFor="inquiryType" className="block text-sm font-semibold text-neutral-700 mb-2">
                            Inquiry Type *
                          </label>
                          <select
                            id="inquiryType"
                            required
                            value={formData.inquiryType}
                            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                          >
                            <option value="">Select type...</option>
                            {inquiryTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                          placeholder="Tell us how we can help..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Publisher Contact */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-serif text-title text-primary-500 mb-4">
                  Publisher
                </h3>
                <div className="text-neutral-600 mb-4">
                  <strong className="text-primary-500">Yale University Press</strong>
                  <br />
                  302 Temple Street
                  <br />
                  New Haven, CT 06511
                </div>
                <a
                  href="https://yalebooks.yale.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-red hover:underline text-sm font-semibold"
                >
                  Visit Yale University Press
                </a>
              </div>

              {/* Media Contact */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-serif text-title text-primary-500 mb-4">
                  Media Inquiries
                </h3>
                <p className="text-neutral-600 mb-4">
                  For press inquiries, review copies, and interview requests:
                </p>
                <a
                  href="mailto:publicity@yale.edu"
                  className="text-accent-red hover:underline font-semibold"
                >
                  publicity@yale.edu
                </a>
              </div>

              {/* Academic Contact */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-serif text-title text-primary-500 mb-4">
                  Academic Inquiries
                </h3>
                <p className="text-neutral-600 mb-4">
                  For desk copies, course adoption, or academic collaboration:
                </p>
                <a
                  href="mailto:academic@yale.edu"
                  className="text-accent-red hover:underline font-semibold"
                >
                  academic@yale.edu
                </a>
              </div>

              {/* Quick Links */}
              <div className="bg-neutral-100 rounded-xl p-6">
                <h3 className="font-serif text-title text-primary-500 mb-4">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/media"
                    className="flex items-center gap-2 text-neutral-600 hover:text-accent-red transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Media Kit &amp; Press Resources
                  </Link>
                  <Link
                    href="/events"
                    className="flex items-center gap-2 text-neutral-600 hover:text-accent-red transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Events &amp; Speaking
                  </Link>
                  <Link
                    href="/book#purchase"
                    className="flex items-center gap-2 text-neutral-600 hover:text-accent-red transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Pre-Order the Book
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
