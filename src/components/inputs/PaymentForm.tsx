import { useState, useEffect } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { StripeCardElement } from "@stripe/stripe-js";
import { useTranslation } from "react-i18next";
import Button from "../inputs/Button";
import { stripeApi, ApiError } from "../../lib/api";
import { getStripe } from "../../lib/stripe";
import { getInitialCurrency } from "../../utils/currencyDetection";

// Price IDs are no longer needed - we use dynamic pricing with amount + currency

interface DonationFormProps {
  onCurrencyChange: (currency: string) => void;
}

function DonationForm({ onCurrencyChange }: DonationFormProps) {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  const [selectedAmount, setSelectedAmount] = useState("24,00");
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  // Load currency with timezone detection on first visit
  const [currency, setCurrency] = useState(() => {
    return getInitialCurrency();
  });

  interface DonationOption {
    value: string;
    label: string;
    period: string;
  }

  // Function to get currency symbol
  const getCurrencySymbol = (currency: string): string => {
    switch (currency) {
      case "brl":
        return "R$";
      case "usd":
        return "$";
      case "eur":
        return "€";
      default:
        return "€";
    }
  };

  // Function to get donation options based on currency
  const getDonationOptions = (currency: string): DonationOption[] => {
    const symbol = getCurrencySymbol(currency);

    if (currency === "brl") {
      return [
        {
          value: "40,00",
          label: `${symbol}40,00`,
          period: t("ContributePage.formSection.plans.monthly"),
        },
        {
          value: "80,00",
          label: `${symbol}80,00`,
          period: t("ContributePage.formSection.plans.monthly"),
        },
        {
          value: "120,00",
          label: `${symbol}120,00`,
          period: t("ContributePage.formSection.plans.monthly"),
        },
        {
          value: "160,00",
          label: `${symbol}160,00`,
          period: t("ContributePage.formSection.plans.monthly"),
        },
        {
          value: "custom",
          label: t("ContributePage.formSection.plans.oneTime"),
          period: t("ContributePage.formSection.plans.donation"),
        },
      ];
    }

    // Default EUR/USD values
    return [
      {
        value: "12,00",
        label: `${symbol}12,00`,
        period: t("ContributePage.formSection.plans.monthly"),
      },
      {
        value: "24,00",
        label: `${symbol}24,00`,
        period: t("ContributePage.formSection.plans.monthly"),
      },
      {
        value: "48,00",
        label: `${symbol}48,00`,
        period: t("ContributePage.formSection.plans.monthly"),
      },
      {
        value: "96,00",
        label: `${symbol}96,00`,
        period: t("ContributePage.formSection.plans.monthly"),
      },
      {
        value: "custom",
        label: t("ContributePage.formSection.plans.oneTime"),
        period: t("ContributePage.formSection.plans.donation"),
      },
    ];
  };

  const donationOptions = getDonationOptions(currency);

  interface SelectedPlan {
    name: string;
    price: number;
  }

  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>({
    name: `${donationOptions[1].label} ${donationOptions[1].period}`,
    price: parseFloat(donationOptions[1].value.replace(",", ".")),
  });

  // Effect to handle currency change and reset values
  useEffect(() => {
    const newDonationOptions = getDonationOptions(currency);

    // Reset to default selection when currency changes
    setSelectedAmount(newDonationOptions[1].value);
    setIsCustomAmount(false);
    setSelectedPlan({
      name: `${newDonationOptions[1].label} ${newDonationOptions[1].period}`,
      price: parseFloat(newDonationOptions[1].value.replace(",", ".")),
    });

    // Reset custom amount if it was selected
    if (isCustomAmount) {
      setCustomAmount(currency === "brl" ? "80,00" : "50,00");
    }

    // Save currency to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("oasis-selected-currency", currency);
    }

    // Notify parent component about currency change
    onCurrencyChange(currency);
  }, [currency, isCustomAmount, onCurrencyChange]);

  const handleAmountSelect = (amount: string) => {
    const currentOptions = getDonationOptions(currency);

    if (amount === "custom") {
      setIsCustomAmount(true);
      setSelectedAmount("custom");
      setCustomAmount(currency === "brl" ? "80,00" : "50,00");
    } else {
      setIsCustomAmount(false);
      setSelectedAmount(amount);
      const selectedOption = currentOptions.find((opt) => opt.value === amount);
      if (selectedOption) {
        setSelectedPlan({
          name: `${selectedOption.label} ${selectedOption.period}`,
          price: parseFloat(selectedOption.value.replace(",", ".")),
        });
      }
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9,]/g, "");
    setCustomAmount(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError(t("ContributePage.formSection.errors.loading"));
      return;
    }

    if (!email || !fullName) {
      setError(t("ContributePage.formSection.errors.requiredFields"));
      return;
    }

    if (
      isCustomAmount &&
      (!customAmount || parseFloat(customAmount.replace(",", ".")) <= 0)
    ) {
      setError(t("ContributePage.formSection.errors.invalidAmount"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error(t("ContributePage.formSection.errors.cardElement"));
      }

      if (isCustomAmount) {
        await handleOneTimePayment(cardElement);
      } else {
        await handleSubscriptionPayment(cardElement);
      }

      setSuccess(true);
    } catch (err: any) {
      console.error("Error processing payment:", err);
      setError(
        err.message || t("ContributePage.formSection.errors.unexpected")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionPayment = async (cardElement: StripeCardElement) => {
    if (!stripe || !elements) {
      setError(t("ContributePage.formSection.errors.loading"));
      return;
    }

    try {
      const setupData = await stripeApi.setupIntent({
        customer_name: fullName,
        customer_email: email,
        currency: currency,
      });

      const { error: setupError, setupIntent } =
        await stripe.confirmCardSetup(setupData.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: fullName,
              email: email,
            },
          },
        });

      if (setupError) {
        throw new Error(setupError.message);
      }

      // Calculate amount in cents based on selected plan
      const amountInCents = Math.round(selectedPlan.price * 100);

      // Validate currency
      if (!["eur", "usd", "brl"].includes(currency.toLowerCase())) {
        throw new Error(`Unsupported currency: ${currency}`);
      }

      await stripeApi.createSubscription({
        customerId: setupData.customerId,
        paymentMethodId: setupIntent.payment_method as string,
        amount: amountInCents,
        currency: currency.toLowerCase(), // Ensure lowercase for Stripe API
        interval: "month",
      });
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error(t("ContributePage.formSection.errors.subscription"));
    }
  };

  const handleOneTimePayment = async (cardElement: StripeCardElement) => {
    if (!stripe || !elements) {
      setError(t("ContributePage.formSection.errors.loading"));
      return;
    }

    try {
      const amount = customAmount || "50,00";
      const amountInCents = Math.round(
        parseFloat(amount.replace(",", ".")) * 100
      );

      // Validate currency
      if (!["eur", "usd", "brl"].includes(currency.toLowerCase())) {
        throw new Error(`Unsupported currency: ${currency}`);
      }

      const paymentData = await stripeApi.createPayment({
        amount: amountInCents,
        currency: currency.toLowerCase(), // Ensure lowercase for Stripe API
      });

      const { error: paymentError } = await stripe.confirmCardPayment(
        paymentData.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: fullName,
              email: email,
            },
          },
        }
      );

      if (paymentError) {
        throw new Error(paymentError.message);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error(t("ContributePage.formSection.errors.payment"));
    }
  };

  if (success) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow-md text-center">
        <div className="w-16 h-16 rounded-full bg-[#509f8c] flex items-center justify-center text-white text-3xl mx-auto mb-4">
          ✓
        </div>
        <h2 className="text-2xl font-bold mb-4">
          {t("ContributePage.formSection.success.title")}
        </h2>
        <p className="mb-6 text-gray-600">
          {isCustomAmount
            ? t("ContributePage.formSection.success.oneTime")
            : t("ContributePage.formSection.success.subscription")}
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              // Reset form state instead of reloading
              setSuccess(false);
              setError("");
              setEmail("");
              setFullName("");
              setSelectedAmount("24,00");
              setIsCustomAmount(false);
              setCustomAmount("");
              const newDonationOptions = getDonationOptions(currency);
              setSelectedPlan({
                name: `${newDonationOptions[1].label} ${newDonationOptions[1].period}`,
                price: parseFloat(newDonationOptions[1].value.replace(",", ".")),
              });
            }}
            className="px-12 py-2 bg-[#509f8c] text-white rounded-full font-medium hover:bg-[#65509F] shadow-md cursor-pointer"
          >
            {t("ContributePage.formSection.success.return")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-6">
        {getDonationOptions(currency).map((option) => (
          <div
            key={option.value}
            className={`cursor-pointer border rounded-md p-2 text-center hover:bg-[#65509F] hover:text-white shadow-lg py-5 ${
              selectedAmount === option.value
                ? "bg-[#509f8c] text-white"
                : "border-[#509f8c] text-[#509f8c]"
            }`}
            onClick={() => handleAmountSelect(option.value)}
          >
            <div
              className={`font-bold ${
                option.label.length > 5 ? "text-xl" : "text-2xl"
              }`}
            >
              {option.label}
            </div>
            <div className="text-xs">{option.period}</div>
          </div>
        ))}
        <div className="flex flex-col gap-2 md:hidden">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="eur">
              {t("ContributePage.formSection.currencies.eur")}
            </option>
            <option value="usd">
              {t("ContributePage.formSection.currencies.usd")}
            </option>
            <option value="brl">
              {t("ContributePage.formSection.currencies.brl")}
            </option>
          </select>
          {isCustomAmount ? (
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder={t("ContributePage.formSection.amount")}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          ) : (
            <input
              type="text"
              value={selectedAmount}
              disabled
              className="w-full p-2 border border-gray-300 rounded bg-gray-200 text-gray-700"
            />
          )}
        </div>
      </div>

      <div className="flex flex-wrap mb-4 -mx-2">
        <div className="w-3/12 px-2 hidden md:block">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="eur">
              {t("ContributePage.formSection.currencies.eur")}
            </option>
            <option value="usd">
              {t("ContributePage.formSection.currencies.usd")}
            </option>
            <option value="brl">
              {t("ContributePage.formSection.currencies.brl")}
            </option>
          </select>
        </div>
        <div className="w-12/12 md:w-9/12 px-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("ContributePage.formSection.email")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap mb-4 -mx-2">
        <div className="w-3/12 px-2 hidden md:block">
          {isCustomAmount ? (
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder={t("ContributePage.formSection.amount")}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          ) : (
            <input
              type="text"
              value={selectedAmount}
              disabled
              className="w-full p-2 border border-gray-300 rounded bg-gray-200 text-gray-700"
            />
          )}
        </div>
        <div className="w-12/12 md:w-9/12 px-2">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t("ContributePage.formSection.name")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                  color: "#aab7c4",
                },
                lineHeight: "24px",
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
            },
            hidePostalCode: true,
            disableLink: true,
          }}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <div className="flex justify-center xl:justify-start">
        <Button
          type="submit"
          disabled={loading || !stripe || !elements}
        >
          {loading
            ? t("ContributePage.formSection.submitting")
            : t("ContributePage.formSection.submit")}
        </Button>
      </div>
    </form>
  );
}

export default function DonationFormWrapper() {
  // Load currency with timezone detection on first visit
  const [currency, setCurrency] = useState(() => {
    return getInitialCurrency();
  });
  const [stripe, setStripeInstance] = useState<any>(null);

  useEffect(() => {
    const loadStripeForCurrency = async () => {
      const stripe = await getStripe(currency);
      setStripeInstance(stripe);
    };

    loadStripeForCurrency();
  }, [currency]);

  // Save currency to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("oasis-selected-currency", currency);
    }
  }, [currency]);

  if (!stripe) {
    return <div>Loading payment form...</div>;
  }

  return (
    <Elements stripe={stripe} key={currency}>
      <DonationForm onCurrencyChange={setCurrency} />
    </Elements>
  );
}
