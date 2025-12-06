'use client'

import { useState } from 'react'
import { useToast } from '@/components/ui/Toast'

interface NewsletterFormProps {
  variant?: 'footer' | 'standalone'
}

export default function NewsletterForm({ variant = 'footer' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      addToast({
        type: 'success',
        title: 'Thanks for subscribing!',
        description: "You'll receive updates about the book and events.",
        duration: 5000,
      })
      setEmail('')
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Subscription failed',
        description: err instanceof Error ? err.message : 'Please try again.',
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (variant === 'footer') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 transition-colors"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-secondary-500 text-primary-500 font-sans font-bold rounded-lg hover:bg-secondary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    )
  }

  // Standalone variant for events page
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary-400"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 bg-secondary-500 text-primary-500 rounded-lg font-bold hover:bg-secondary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  )
}
