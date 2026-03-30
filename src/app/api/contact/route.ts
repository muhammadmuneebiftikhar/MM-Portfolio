import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    // Here you would typically use a service like Resend, SendGrid, or nodemailer
    // For now, we will log the submission and return a success response
    console.log('New Contact Form Submission:', { name, email, subject, message });

    // In a real implementation:
    // const res = await resend.emails.send({
    //   from: 'Contact Form <onboarding@resend.dev>',
    //   to: 'muneebiftikhar382@m1shipping.com',
    //   subject: subject || `New message from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    // });

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 });
  }
}
