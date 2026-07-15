import { NextResponse } from 'next/server';

// Email sending client — integrate with Resend, Postmark, or SendGrid in production
// For now, this is a stub that logs emails

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from = 'hello@aprilihasingh.com' }: SendEmailParams): Promise<boolean> {
  // In production, integrate with your ESP:
  // Resend: const { data, error } = await resend.emails.send({ from, to, subject, html });
  // Postmark: await postmarkClient.sendEmail({ From: from, To: to, Subject: subject, HtmlBody: html });
  // SendGrid: await sgMail.send({ to, from, subject, html });

  console.log(`[Email] To: ${to} | Subject: ${subject}`);
  return true;
}
