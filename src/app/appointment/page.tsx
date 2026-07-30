'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { SectionHeader } from '@/components/sections/Hero';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { img } from '@/lib/images';
import { cn } from '@/lib/utils';

type AppointmentType = 'private-viewing' | 'virtual-consultation' | 'bespoke-commission' | 'heirloom-redesign' | 'repair-restoration';

interface FormData {
  appointmentType: AppointmentType;
  name: string;
  email: string;
  phone: string;
  city: string;
  preferredDate: string;
  preferredTime: string;
  occasion: string;
  collectionInterest: string;
  message: string;
}

interface FormErrors {
  appointmentType?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  preferredDate?: string;
  preferredTime?: string;
  occasion?: string;
  collectionInterest?: string;
  message?: string;
}

const appointmentTypes: { value: AppointmentType; label: string; description: string }[] = [
  { value: 'private-viewing', label: 'Private Viewing', description: 'Visit our Jaipur atelier by appointment — experience pieces in person with our creative director.' },
  { value: 'virtual-consultation', label: 'Virtual Consultation', description: 'A 45-minute video call from anywhere in the world. We\'ll share pieces, discuss ideas, answer questions.' },
  { value: 'bespoke-commission', label: 'Bespoke Commission', description: 'Create a piece from scratch. For engagements, milestones, or the piece you\'ve always imagined.' },
  { value: 'heirloom-redesign', label: 'Heirloom Redesign', description: 'Reimagine family stones into something you\'ll wear daily. We honor the past, design for the present.' },
  { value: 'repair-restoration', label: 'Repair & Restoration', description: 'Expert care for pieces that need attention — from clasp replacement to full restoration.' },
];

const occasions = [
  'Engagement',
  'Wedding',
  'Anniversary',
  'Self-purchase',
  'Gift',
  'Bespoke commission',
  'Heirloom redesign',
  'Other',
];

export default function AppointmentPage() {
  const [formData, setFormData] = useState<FormData>({
    appointmentType: 'private-viewing',
    name: '',
    email: '',
    phone: '',
    city: '',
    preferredDate: '',
    preferredTime: '',
    occasion: '',
    collectionInterest: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.appointmentType) newErrors.appointmentType = 'Please select an appointment type';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred date';
    if (!formData.preferredTime) newErrors.preferredTime = 'Please select a preferred time';
    if (!formData.occasion) newErrors.occasion = 'Please select an occasion';
    if (!formData.message.trim()) newErrors.message = 'Please tell us a little about what you\'re looking for';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          appointmentType: 'private-viewing',
          name: '',
          email: '',
          phone: '',
          city: '',
          preferredDate: '',
          preferredTime: '',
          occasion: '',
          collectionInterest: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <>
      <Header />
      <main className="site-main">
        <Hero
          image={img.appointmentHero}
          imageAlt="Apriliha Singh atelier consultation area"
          eyebrow="BOOK AN APPOINTMENT"
          title="Begin the Conversation"
          description="Every piece begins with a conversation. Choose how you'd like to connect — in our Jaipur atelier, virtually from anywhere, or through a bespoke commission inquiry."
          alignment="left"
        />

        <section className="py-20 px-responsive" aria-labelledby="appointment-types-title">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              id="appointment-types-title"
              eyebrow="APPOINTMENT TYPES"
              title="Choose Your Path"
              description="Select the experience that fits where you are in your journey."
              alignment="center"
            />

            <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {appointmentTypes.map((type) => (
                <label
                  key={type.value}
                  className={cn(
                    'relative p-8 border-2 rounded-sm cursor-pointer transition-all duration-300',
                    formData.appointmentType === type.value
                      ? 'border-accent-gold bg-bg-primary'
                      : 'border-border hover:border-accent-gold/50'
                  )}
                >
                  <input
                    type="radio"
                    name="appointmentType"
                    value={type.value}
                    checked={formData.appointmentType === type.value}
                    onChange={() => handleChange('appointmentType', type.value)}
                    className="sr-only"
                  />
                  <div className="font-display text-h3 mb-4">{type.label}</div>
                  <p className="font-ui text-body text-text-primary/60">{type.description}</p>
                  {formData.appointmentType === type.value && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-accent-gold bg-accent-gold flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-ivory-text)" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-secondary" aria-labelledby="form-title">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              id="form-title"
              eyebrow="YOUR DETAILS"
              title="Tell Us About Yourself"
              description="We'll confirm within 24 hours with available slots and any questions."
              alignment="center"
            />

            <form onSubmit={handleSubmit} className="mt-16 max-w-[700px] mx-auto" noValidate>
              {submitStatus === 'success' && (
                <div className="mb-8 p-8 bg-accent-primary/10 border border-accent-gold rounded-sm text-center animate-in fade-in slide-in-from-top-4 duration-500">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-accent-gold">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <h3 className="font-display text-h3 mb-2">Request Submitted</h3>
                  <p className="font-ui text-body">Thank you. Our concierge will reach out within 24 hours to confirm your appointment.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 p-6 border border-red-500 rounded-sm bg-red-500/10 text-center animate-in fade-in slide-in-from-top-4 duration-500">
                  <p className="font-ui text-body text-red-600">Something went wrong. Please try again or email us directly at concierge@aprilihasingh.com</p>
                </div>
              )}

              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={errors.name}
                    placeholder="Your name"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={errors.email}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="Phone (with country code)"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                    required
                  />
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    error={errors.city}
                    placeholder="Your city"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="Preferred Date"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleChange('preferredDate', e.target.value)}
                    error={errors.preferredDate}
                    min={minDate}
                    required
                  />
                  <Input
                    label="Preferred Time (IST)"
                    type="time"
                    value={formData.preferredTime}
                    onChange={(e) => handleChange('preferredTime', e.target.value)}
                    error={errors.preferredTime}
                    min="10:00"
                    max="19:00"
                    required
                  />
                </div>

                <div>
                  <label className="block font-ui text-caption font-medium mb-2">Occasion</label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => handleChange('occasion', e.target.value)}
                    className={cn('input-field w-full', errors.occasion && 'border-b-accent-primary')}
                    required
                    aria-invalid={errors.occasion ? 'true' : 'false'}
                  >
                    <option value="">Select occasion</option>
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                  {errors.occasion && (
                    <p className="mt-2 font-ui text-caption text-accent-primary">{errors.occasion}</p>
                  )}
                </div>

                <Input
                  label="Collection of Interest (Optional)"
                  value={formData.collectionInterest}
                  onChange={(e) => handleChange('collectionInterest', e.target.value)}
                  placeholder="e.g., The Zenana Edit, The Maharani Suite..."
                />

                <Textarea
                  label="Tell Us a Little More"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  error={errors.message}
                  placeholder="Any specific pieces you're interested in? Stones you have? A story you want to tell? The more detail, the better we can prepare."
                  rows={6}
                  required
                />

                <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>
                  Submit Appointment Request
                </Button>

                <p className="font-ui text-caption text-center text-text-primary/40">
                  By submitting, you agree to our <a href="/privacy" className="underline-gold">Privacy Policy</a>. We never share your details.
                </p>
              </div>
            </form>
          </div>
        </section>

        <section className="py-20 px-responsive bg-bg-dark text-text-inverse" aria-labelledby="faq-title">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              id="faq-title"
              eyebrow="FAQ"
              title="Common Questions"
              alignment="center"
            />

            <div className="mt-16 max-w-[800px] mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="group border-b border-border py-6">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-display text-h3">
                    {faq.question}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-gold transition-transform duration-300 group-open:rotate-180">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="pt-4 font-ui text-body text-text-primary/65">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-responsive" aria-labelledby="contact-alt-title">
          <div className="max-w-[1440px] mx-auto text-center">
            <SectionHeader
              id="contact-alt-title"
              eyebrow="PREFER TO REACH US DIRECTLY?"
              title="Concierge Channels"
              alignment="center"
            />
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
              <a href="mailto:concierge@aprilihasingh.com" className="font-ui text-caption underline-gold inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                concierge@aprilihasingh.com
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="font-ui text-caption underline-gold inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                WhatsApp: +91 98765 43210
              </a>
              <a href="tel:+919876543210" className="font-ui text-caption underline-gold inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call: +91 98765 43210
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 2 weeks ahead for private viewings, and 1 week for virtual consultations. For bespoke commissions, the earlier the better — especially for weddings (6+ months ideal).',
  },
  {
    question: 'What happens during a private viewing?',
    answer: 'You\'ll have the atelier to yourself for 90 minutes. Our creative director presents pieces from your collections of interest, answers questions about craft and stones, and discusses any bespoke ideas. No pressure to purchase.',
  },
  {
    question: 'Can I bring family or friends?',
    answer: 'Absolutely. Up to 3 guests are welcome for private viewings. For virtual consultations, anyone can join the call.',
  },
  {
    question: 'What if I need to reschedule?',
    answer: 'Just reply to your confirmation email or WhatsApp us at least 24 hours ahead. We\'ll find a new slot at no charge.',
  },
  {
    question: 'Do you ship internationally for virtual consultation clients?',
    answer: 'Yes. We ship worldwide with insurance and signature required. Shipping and duties are quoted per order.',
  },
  {
    question: 'What\'s the bespoke process timeline?',
    answer: 'Typically 8–16 weeks from design approval to delivery, depending on complexity. We\'ll give you a clear timeline at your first consultation.',
  },
];