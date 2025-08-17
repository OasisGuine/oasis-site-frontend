// Get the appropriate donor portal URL based on currency
export const getDonorPortalUrl = (currency: string = 'eur'): string => {
  const normalizedCurrency = currency.toLowerCase();
  
  if (normalizedCurrency === 'brl') {
    return import.meta.env.VITE_DONOR_PORTAL_URL_BR || 'https://your-donor-portal-br.com';
  } else if (normalizedCurrency === 'eur' || normalizedCurrency === 'usd') {
    return import.meta.env.VITE_DONOR_PORTAL_URL_EU || 'https://your-donor-portal-eu.com';
  }
  
  // Default to EU portal
  return import.meta.env.VITE_DONOR_PORTAL_URL_EU || 'https://your-donor-portal-eu.com';
};