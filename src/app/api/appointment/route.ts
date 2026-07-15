import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const requiredFields = ['appointmentType', 'name', 'email', 'phone', 'city', 'preferredDate', 'preferredTime', 'occasion', 'message'];
    const missingFields = requiredFields.filter((field) => !body[field] || body[field].trim() === '');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const appointmentTypes = ['private-viewing', 'virtual-consultation', 'bespoke-commission', 'heirloom-redesign', 'repair-restoration'];
    if (!appointmentTypes.includes(body.appointmentType)) {
      return NextResponse.json(
        { error: 'Invalid appointment type' },
        { status: 400 }
      );
    }

    console.log('Appointment request received:', {
      ...body,
      timestamp: new Date().toISOString(),
    });

    // In production, integrate with:
    // - Email service (Resend, SendGrid, etc.)
    // - CRM (HubSpot, Airtable, etc.)
    // - WhatsApp Business API
    // - Calendar (Google Calendar, Calendly)

    return NextResponse.json(
      { success: true, message: 'Appointment request received. We will contact you within 24 hours.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Appointment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}