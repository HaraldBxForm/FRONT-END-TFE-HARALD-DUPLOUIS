'use server'

import { headers } from 'next/headers'

import { stripe } from '../lib/stripe.js'

export async function fetchClientSecret(amount) {
  const origin = (await headers()).get('origin')

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [{
        price_data: {
            currency: 'eur',
            unit_amount: amount,
            product_data: {
                name: 'Support us with a donation',
            },
        },
        quantity: 1,
    }],
    mode: 'payment',
    return_url: `${origin}/donation/donation-succeed`,
  })

  return session.client_secret
}