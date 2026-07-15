'use client';

import { Input } from '@/components/ui/Input';

interface ShippingStepProps {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  onChange: (field: string, value: string) => void;
}

export function ShippingStep({ line1, line2, city, state, postalCode, country, onChange }: ShippingStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="ship-line1" className="block font-ui text-caption mb-2">Address Line 1</label>
        <Input
          id="ship-line1"
          value={line1}
          onChange={(e) => onChange('line1', e.target.value)}
          placeholder="Street address"
          autoComplete="address-line1"
        />
      </div>
      <div>
        <label htmlFor="ship-line2" className="block font-ui text-caption mb-2">Address Line 2 (optional)</label>
        <Input
          id="ship-line2"
          value={line2}
          onChange={(e) => onChange('line2', e.target.value)}
          placeholder="Apartment, suite, etc."
          autoComplete="address-line2"
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="ship-city" className="block font-ui text-caption mb-2">City</label>
          <Input
            id="ship-city"
            value={city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="City"
            autoComplete="address-level2"
          />
        </div>
        <div>
          <label htmlFor="ship-state" className="block font-ui text-caption mb-2">State</label>
          <Input
            id="ship-state"
            value={state}
            onChange={(e) => onChange('state', e.target.value)}
            placeholder="State"
            autoComplete="address-level1"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="ship-postal" className="block font-ui text-caption mb-2">Postal Code</label>
          <Input
            id="ship-postal"
            value={postalCode}
            onChange={(e) => onChange('postalCode', e.target.value)}
            placeholder="000000"
            autoComplete="postal-code"
          />
        </div>
        <div>
          <label htmlFor="ship-country" className="block font-ui text-caption mb-2">Country</label>
          <Input
            id="ship-country"
            value={country}
            onChange={(e) => onChange('country', e.target.value)}
            placeholder="India"
            autoComplete="country-name"
          />
        </div>
      </div>
    </div>
  );
}
