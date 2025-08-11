/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
  readonly VITE_DONOR_PORTAL_URL: string
  readonly VITE_SITE_URL: string
  readonly VITE_PRICE_1_USD: string
  readonly VITE_PRICE_1_EUR: string
  readonly VITE_PRICE_2_USD: string
  readonly VITE_PRICE_2_EUR: string
  readonly VITE_PRICE_3_USD: string
  readonly VITE_PRICE_3_EUR: string
  readonly VITE_PRICE_4_USD: string
  readonly VITE_PRICE_4_EUR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}