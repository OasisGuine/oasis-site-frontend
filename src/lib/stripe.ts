import { loadStripe, Stripe } from "@stripe/stripe-js";

// Keep references to Stripe instances to avoid multiple instances per account
let stripeInstances: { [key: string]: Stripe | null } = {};
let stripePromises: { [key: string]: Promise<Stripe | null> | null } = {};

// Get the appropriate Stripe publishable key based on currency
const getStripeKey = (currency: string): string | null => {
  const normalizedCurrency = currency.toLowerCase();
  
  if (normalizedCurrency === 'brl') {
    return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_BR;
  } else if (normalizedCurrency === 'eur' || normalizedCurrency === 'usd') {
    return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_EU;
  }
  
  console.error(`Unsupported currency: ${currency}`);
  return null;
};

// Initialize Stripe with appropriate key based on currency
export const getStripe = async (currency: string = 'eur'): Promise<Stripe | null> => {
  const publishableKey = getStripeKey(currency);
  
  if (!publishableKey) {
    console.error(`Missing Stripe publishable key for currency: ${currency}`);
    return null;
  }

  // Use currency as key to cache different Stripe instances
  const instanceKey = currency.toLowerCase();
  
  if (stripeInstances[instanceKey]) {
    return stripeInstances[instanceKey];
  }

  if (!stripePromises[instanceKey]) {
    try {
      stripePromises[instanceKey] = loadStripe(publishableKey);
      stripeInstances[instanceKey] = await stripePromises[instanceKey];
      return stripeInstances[instanceKey];
    } catch (error) {
      console.error(`Failed to load Stripe for currency ${currency}:`, error);
      stripePromises[instanceKey] = null;
      return null;
    }
  }

  try {
    stripeInstances[instanceKey] = await stripePromises[instanceKey];
    return stripeInstances[instanceKey];
  } catch (error) {
    console.error(`Failed to resolve Stripe promise for currency ${currency}:`, error);
    stripePromises[instanceKey] = null;
    return null;
  }
};
