// Runtime configuration for PeterPay frontend.
// Wire these via your build/deploy environment (e.g. Vite VITE_*, Next.js NEXT_PUBLIC_*).
// While inside Magic Patterns there is no .env support, so we read from window/global at runtime.

declare global {
  interface Window {
    __PETERPAY_CONFIG__?: {
      API_BASE_URL?: string;
      ENVIRONMENT?: 'sandbox' | 'live';
    };
  }
}

function readConfig() {
  if (typeof window !== 'undefined' && window.__PETERPAY_CONFIG__) {
    return window.__PETERPAY_CONFIG__;
  }
  return {};
}

const cfg = readConfig();

export const API_BASE_URL = cfg.API_BASE_URL || 'https://api.peterpay.com/v1'; // change in production via window.__PETERPAY_CONFIG__

export const DEFAULT_ENVIRONMENT: 'sandbox' | 'live' =
cfg.ENVIRONMENT || 'sandbox';