'use client';

import { useState } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';

interface Address {
  id: string;
  label: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const { addToast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ label: 'Home', line1: '', line2: '', city: '', state: '', postalCode: '', country: 'India' });

  const handleSave = () => {
    if (!form.line1 || !form.city) return;
    const newAddr: Address = {
      id: `addr_${Date.now()}`,
      ...form,
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, newAddr]);
    setIsAdding(false);
    setForm({ label: 'Home', line1: '', line2: '', city: '', state: '', postalCode: '', country: 'India' });
    addToast('Address saved');
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    addToast('Address removed');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-h2">Addresses</h2>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn-ghost text-text-primary text-sm">
            + Add New
          </button>
        )}
      </div>

      {addresses.length === 0 && !isAdding && (
        <EmptyState
          title="No saved addresses"
          description="Add an address for faster checkout."
        />
      )}

      {addresses.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {addresses.map((addr) => (
            <div key={addr.id} className={`p-6 border rounded-sm ${addr.isDefault ? 'border-accent-gold' : 'divider-ink'}`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-h3">{addr.label}</h3>
                {addr.isDefault && (
                  <span className="font-ui text-caption px-2 py-0.5 bg-accent-gold/10 text-accent-gold rounded-sm">Default</span>
                )}
              </div>
              <p className="font-ui text-body text-text-primary/70">
                {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}
                <br />{addr.city}, {addr.state} {addr.postalCode}
              </p>
              <button onClick={() => deleteAddress(addr.id)} className="mt-3 font-ui text-caption underline-gold text-text-primary/50">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {isAdding && (
        <div className="p-6 border border-border rounded-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-ui text-caption mb-2">Label</label>
              <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Home, Office..." />
            </div>
            <div />
          </div>
          <div>
            <label className="block font-ui text-caption mb-2">Address Line 1</label>
            <Input value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} placeholder="Street address" />
          </div>
          <div>
            <label className="block font-ui text-caption mb-2">Address Line 2</label>
            <Input value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} placeholder="Optional" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-ui text-caption mb-2">City</label>
              <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            <div>
              <label className="block font-ui text-caption mb-2">State</label>
              <Input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            </div>
            <div>
              <label className="block font-ui text-caption mb-2">Postal Code</label>
              <Input value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="btn-primary text-text-inverse">Save Address</button>
            <button onClick={() => setIsAdding(false)} className="btn-ghost text-text-primary">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
