'use client'

import { IEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import Checkout from './Checkout';

const CheckoutButton = ({ event }: { event: IEvent }) => {
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;
    const hasEventFinished = new Date(event.endDateTime) < new Date()
    
    return (
    <div className="flex items-center gap-3">
        { /* provera da li se dogadjaj zavrsio */}
        { hasEventFinished ? (
            <p className="p-bold-20 rounded-full bg-red-500/10 px-5 py-2 text-red-700">Karte nisu dostupne.</p>
        ) : (
            <>
                <SignedOut>
                    <Button asChild className="button rounded-full hover:bg-[#4b6977]" size="lg">
                        <Link href="/sign-in">
                            Kupi karte
                        </Link>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <Checkout
                        event={event}
                        userId={userId} 
                    />
                </SignedIn>
            </>
        )}
    </div>
  )
}

export default CheckoutButton