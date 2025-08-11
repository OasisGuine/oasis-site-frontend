import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { DonateType } from '@/utilities/types';
import { stripeApi, ApiError } from '../../lib/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

interface Props extends React.PropsWithChildren {
    type: DonateType
}

const DonateButton: React.FC<Props> = (props) => {
    const { children } = props

    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Create payment intent using the new API
            await stripeApi.createPayment({
                amount: 1000, // $10.00
                currency: 'usd'
            });
            
            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error('Stripe not loaded');
            }
            
            // You might want to redirect to a checkout page or handle the payment intent here
            
        } catch (error) {
            if (error instanceof ApiError) {
                alert(`Payment error: ${error.message}`);
            } else {
                alert('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleCheckout} disabled={loading}>
            {loading ? '...' : children}
        </button>
    );
}

export default DonateButton;