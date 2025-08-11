// API utilities for Oasis frontend
const API_URL = import.meta.env.VITE_API_URL || 'https://oasis-api.ovictorveiga.workers.dev';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper with error handling
async function apiRequest<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (e) {
        // If we can't parse the error response, use the default message
      }
      
      throw new ApiError(errorMessage, response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      0
    );
  }
}

// Stripe API functions
export const stripeApi = {
  // Create payment intent for one-time payments
  createPayment: async (data: {
    amount: number;
    currency: string;
  }) => {
    return apiRequest<{ clientSecret: string }>('/api/create-payment', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Create setup intent for subscriptions
  setupIntent: async (data: {
    customer_email: string;
    customer_name: string;
  }) => {
    return apiRequest<{
      clientSecret: string;
      setupIntentId: string;
      customerId: string;
    }>('/api/setup-intent', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Create subscription
  createSubscription: async (data: {
    customerId: string;
    paymentMethodId: string;
    priceId?: string; // Optional - if not provided, amount + currency will be used
    amount?: number;  // Amount in cents (e.g., 2400 for $24.00)
    currency?: string; // Currency code (e.g., 'usd', 'eur')
    interval?: string; // Interval (default: 'month')
  }) => {
    return apiRequest<{
      subscriptionId: string;
      status: string;
      clientSecret: string | null;
    }>('/api/create-subscription', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Email API functions
export const emailApi = {
  // Send contact form email
  sendEmail: async (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    return apiRequest<{ message: string }>('/api/send-email', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export { ApiError };