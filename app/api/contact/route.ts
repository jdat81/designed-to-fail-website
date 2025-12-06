import { NextRequest, NextResponse } from 'next/server'

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactFormData {
  name: string
  email: string
  organization?: string
  inquiryType: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, organization, inquiryType, message } = body

    // Validate required fields
    if (!name || !email || !inquiryType || !message) {
      return NextResponse.json(
        { error: 'Name, email, inquiry type, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Validate inquiry type
    const validTypes = ['media', 'speaking', 'academic', 'general']
    if (!validTypes.includes(inquiryType)) {
      return NextResponse.json(
        { error: 'Invalid inquiry type' },
        { status: 400 }
      )
    }

    // In production, send email using:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    //
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@designedtofail.com',
    //   to: 'contact@designedtofail.com',
    //   replyTo: email,
    //   subject: `[${inquiryType.toUpperCase()}] Contact from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Organization:</strong> ${organization || 'Not provided'}</p>
    //     <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
    //     <h3>Message:</h3>
    //     <p>${message}</p>
    //   `,
    // })

    // Log submission for now (replace with actual implementation)
    console.log('Contact form submission:', {
      name,
      email,
      organization,
      inquiryType,
      message: message.substring(0, 100) + '...',
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully. We will be in touch soon.'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
