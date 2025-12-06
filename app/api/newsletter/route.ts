import { NextRequest, NextResponse } from 'next/server'

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // In production, integrate with email service provider:
    // - Mailchimp
    // - ConvertKit
    // - SendGrid
    // - Resend
    //
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.contacts.create({
    //   email: email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID!,
    // })

    // Log subscription for now (replace with actual implementation)
    console.log(`Newsletter subscription: ${email}`)

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
