'use client'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { fetchClientSecret } from '@/app/actions/stripe.jsx'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout({amount}) {
  return (
        <div id="checkout" className='p-6 bg-white backdrop-blur-lg border border-white/30 rounded-lg shadow-md w-full'>
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{fetchClientSecret: () => fetchClientSecret(amount) }} // montant en centimes (ici 50€)
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>

  )
}