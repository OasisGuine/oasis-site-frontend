/**
 * Utility to detect user currency based on timezone
 * Only runs on first visit when no currency is saved in localStorage
 */

export const getDefaultCurrencyFromTimezone = (): string => {
  if (typeof window === "undefined") {
    return "eur";
  }

  try {
    // Get user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Brazilian timezones
    const brazilianTimezones = [
      "America/Sao_Paulo",
      "America/Rio_Branco", 
      "America/Manaus",
      "America/Cuiaba",
      "America/Campo_Grande",
      "America/Fortaleza",
      "America/Recife",
      "America/Araguaina",
      "America/Maceio",
      "America/Bahia",
      "America/Belem",
      "America/Santarem",
      "America/Boa_Vista",
      "America/Porto_Velho",
      "America/Eirunepe",
      "America/Noronha"
    ];

    // If user is in Brazilian timezone, default to BRL
    if (brazilianTimezones.includes(timezone)) {
      return "brl";
    }

    // Default to EUR for all other timezones
    return "eur";
  } catch (error) {
    // Fallback to EUR if timezone detection fails
    console.warn("Failed to detect timezone for currency selection:", error);
    return "eur";
  }
};

export const getInitialCurrency = (): string => {
  if (typeof window === "undefined") {
    return "eur";
  }

  const savedCurrency = localStorage.getItem("oasis-selected-currency");
  
  // If currency is already saved, use it
  if (savedCurrency) {
    return savedCurrency;
  }

  // Otherwise, detect from timezone and save it
  const detectedCurrency = getDefaultCurrencyFromTimezone();
  localStorage.setItem("oasis-selected-currency", detectedCurrency);
  
  return detectedCurrency;
};