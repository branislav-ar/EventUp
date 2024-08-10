import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async () => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <>
      {/* my tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Kupljene karte</h3>
          <Button asChild size="lg" className="button hidden sm:flex hover:bg-[#4b6977]">
            <Link href="/#events">
              Pronađite još događaja
            </Link>
          </Button>
        </div>
      </section>
      {/* <section className="wrapper my-8">
        <Collection 
            data={events?.data}
            emptyTitle="Niste kupili nijednu kartu..."
            emptyStateSubtext="Bez brige - događaja ima na pretek"
            collectionType="My_Tickets"
            limit={3}
            page={1}
            urlParamName="ordersPage"
            totalPages={2}
          />
      </section> */}

      {/* my created events */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Moji događaji</h3>
          <Button asChild size="lg" className="button hidden sm:flex hover:bg-[#4b6977]">
            <Link href="/events/create">
              Kreirajte novi događaj
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
            data={organizedEvents?.data}
            emptyTitle="Niste kreirali nijedan događaj..."
            emptyStateSubtext="Kreirajte ga sada"
            collectionType="Events_Organized"
            limit={6}
            page={1}
            urlParamName="eventsPage"
            totalPages={2}
          />
      </section>


    </>
  )
}

export default ProfilePage