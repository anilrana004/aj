'use client';

import { useMemo } from 'react';

type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

const exchangeRates: Record<Currency, number> = {
  INR: 1,
  USD: 83.5,
  EUR: 91.2,
  GBP: 106.0,
  AED: 30.5,
};

const currencyFormats: Record<Currency, Intl.NumberFormatOptions> = {
  INR: { style: 'currency', currency: 'INR', maximumFractionDigits: 0 },
  USD: { style: 'currency', currency: 'USD', maximumFractionDigits: 0 },
  EUR: { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 },
  GBP: { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 },
  AED: { style: 'currency', currency: 'AED', maximumFractionDigits: 0 },
};

export function useLocalePricing(baseCurrency: Currency = 'INR') {
  const detectedCurrency = useMemo<Currency>(() => {
    if (typeof navigator === 'undefined') return baseCurrency;
    const lang = navigator.language || '';
    if (lang.startsWith('en-IN') || lang.startsWith('hi')) return 'INR';
    if (lang.startsWith('en-US')) return 'USD';
    if (lang.startsWith('en-GB')) return 'GBP';
    if (lang.startsWith('ar')) return 'AED';
    if (lang.startsWith('de') || lang.startsWith('fr') || lang.startsWith('it')) return 'EUR';
    return baseCurrency;
  }, [baseCurrency]);

  const formatPrice = useMemo(() => {
    return (priceInINR: number, targetCurrency?: Currency): string => {
      const currency = targetCurrency || detectedCurrency;
      const rate = exchangeRates[currency] / exchangeRates.INR;
      const converted = Math.round(priceInINR * rate);
      return new Intl.NumberFormat(undefined, currencyFormats[currency]).format(converted);
    };
  }, [detectedCurrency]);

  const convertPrice = useMemo(() => {
    return (priceInINR: number, targetCurrency?: Currency): number => {
      const currency = targetCurrency || detectedCurrency;
      const rate = exchangeRates[currency] / exchangeRates.INR;
      return Math.round(priceInINR * rate);
    };
  }, [detectedCurrency]);

  return {
    currency: detectedCurrency,
    formatPrice,
    convertPrice,
    exchangeRates,
  };
}
