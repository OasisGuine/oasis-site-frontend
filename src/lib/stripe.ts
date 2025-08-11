import { loadStripe, Stripe } from "@stripe/stripe-js";

// Keep a reference to the Stripe promise to avoid multiple instances
let stripePromise: Promise<Stripe | null> | null = null;
let stripeInstance: Stripe | null = null;

// Initialize Stripe with publishable key
export const getStripe = async () => {
  if (stripeInstance) {
    return stripeInstance;
  }

  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error("Missing Stripe publishable key");
      return null;
    }

    try {
      stripePromise = loadStripe(publishableKey);
      stripeInstance = await stripePromise;
      return stripeInstance;
    } catch (error) {
      console.error("Failed to load Stripe:", error);
      stripePromise = null;
      return null;
    }
  }

  try {
    stripeInstance = await stripePromise;
    return stripeInstance;
  } catch (error) {
    console.error("Failed to resolve Stripe promise:", error);
    stripePromise = null;
    return null;
  }
};
