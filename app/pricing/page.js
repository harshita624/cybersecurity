'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Pricing = ({ securityPackages }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (priceId) => {
    setLoading(true);

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();

    if (data.id) {
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      console.error('Error creating checkout session:', data.error);
    }

    setLoading(false);
  };

  return (
    <section id="pricing" className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
        Flexible Security Packages
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {securityPackages.map((pkg, index) => (
          <div key={index} className="bg-[#1A1A1A] border border-[#333] rounded-xl p-8 hover:border-[#7B61FF] transition-all">
            <h3 className="text-2xl font-semibold text-[#00F5D4] mb-4">{pkg.name}</h3>
            <div className="text-4xl font-bold mb-6">
              {pkg.price}
              <span className="text-base text-gray-400 ml-2">
                {pkg.price === 'Custom' ? '/ tailored' : '/ month'}
              </span>
            </div>
            <ul className="space-y-4 mb-8">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-300">
                  <span className="mr-3 text-[#00F5D4]">✔️</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 bg-[#7B61FF] text-white rounded-lg hover:bg-opacity-90"
              onClick={() => handleCheckout(pkg.priceId)}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
