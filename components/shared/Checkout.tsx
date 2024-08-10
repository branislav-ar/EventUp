import { IEvent } from '@/lib/database/models/event.model'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'

import { loadStripe } from '@stripe/stripe-js'
import { CheckoutOrder } from '@/lib/actions/order.actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


const Checkout = ({ event, userId}: {event: IEvent, userId: string}) => {
    
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);
    
    const onCheckout = async () => {
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price,
            isFree: event.isFree,
            buyerId: userId
        }

        await CheckoutOrder(order);
    }

  return (
    <form action={onCheckout} method="post">
        <Button
            type="submit"
            role="link"
            size="lg"
            className="button sm:w-fit hover:bg-[#4b6977]"
        >
            {event.isFree ? 'Rezerviši kartu' : 'Kupi kartu'}
        </Button>
    </form>
  )
}

export default Checkout