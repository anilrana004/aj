'use client';

import { useState } from 'react';
import { FadeIn } from '@/components/ui/Animations';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[700px] mx-auto px-6">
        <FadeIn>
          <h1 className="font-serif text-display text-aubergine text-center mb-4">Contact</h1>
          <p className="text-body-lg text-bronze text-center mb-16">
            We&apos;d love to hear from you. Whether you have a question about a piece, a bespoke inquiry, or just want to say hello.
          </p>
        </FadeIn>

        {sent ? (
          <FadeIn>
            <div className="text-center py-12 bg-stone/20">
              <h2 className="font-serif text-subhead text-aubergine mb-3">Message Sent</h2>
              <p className="text-body text-bronze">
                Thank you for reaching out. We&apos;ll respond within 24 hours.
              </p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <Input
                label="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
              <Textarea
                label="Message"
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
              <Button type="submit" size="lg" loading={loading}>
                Send Message
              </Button>
            </form>
          </FadeIn>
        )}

        <FadeIn delay={0.2}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-label uppercase tracking-widest text-bronze/50 mb-2">Email</p>
              <p className="text-body text-aubergine">hello@aprilihasingh.com</p>
            </div>
            <div>
              <p className="text-label uppercase tracking-widest text-bronze/50 mb-2">Atelier</p>
              <p className="text-body text-aubergine">Jaipur, Rajasthan</p>
            </div>
            <div>
              <p className="text-label uppercase tracking-widest text-bronze/50 mb-2">Response Time</p>
              <p className="text-body text-aubergine">Within 24 hours</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
