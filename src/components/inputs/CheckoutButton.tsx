'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { DonateType } from '@/utilities/types';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

interface Props extends React.PropsWithChildren {
    type: DonateType
}

const DonateButton: React.FC<Props> = (props) => {
    const { children, type } = props

    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        const res = await fetch('/api/contribute', { method: 'POST', body: JSON.stringify({ amount: 1000, type }) });
        const { id } = await res.json();
        const stripe = await stripePromise;
        stripe?.redirectToCheckout({ sessionId: id });
        setLoading(false);
    };

    return (
        <button onClick={handleCheckout} disabled={loading}>
            {loading ? '...' : children}
        </button>
    );
}

export default DonateButton;