import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const EventDetails = async ({ params: { id }, searchParams}: SearchParamProps) => {
  
  const event = await getEventById(id);
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string
  })

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="flex flex-col md:flex-row 2xl:max-w-7xl w-full">
          <div className="w-full md:w-1/2">
            <Image 
              src={event.imageUrl}
              alt="hero_image"
              width={1000}
              height={1000}
              className="w-full h-full min-h-[300px] object-cover object-center"
            />
          </div>

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6 cursor-default">
            <h2 className="h2-bold">{event.title}</h2>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">  
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {event.isFree ? "besplatno" : `${event.price} RSD`}
                </p>
                <p className="p-medium-16 rounded-full bg-gray-500/10 px-4 py-2.5 text-grat-500">
                  {event.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span
                  className="text-[#395E6F]"
                >
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </p>
            </div>
          </div>

          {/* CHECKOUT BUTTON */}
          <CheckoutButton event={event}/>

          <div className="flex flex-col gap-5 cursor-default">
            
            <div className="flex gap-2 md:gap-3">
              <Image 
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={32} 
                height={32}
              />

              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>
                  { formatDateTime(event.startDateTime).dateOnly === formatDateTime(event.endDateTime).dateOnly
                    ? `${formatDateTime(event.startDateTime).dateOnly} ${formatDateTime(event.startDateTime).timeOnly} - ${formatDateTime(event.endDateTime).timeOnly}`
                    : `${formatDateTime(event.startDateTime).dateOnly} ${formatDateTime(event.startDateTime).timeOnly} - ${formatDateTime(event.endDateTime).dateOnly} ${formatDateTime(event.endDateTime).timeOnly}`
                  }
                </p>
              </div>
            </div>
            <div className="p-regular-20 flex items-center gap-3">
              <Image 
                src="/assets/icons/location.svg"
                alt="location"
                width={32}
                height={32}
                />
              <p className="p-medium-16 lg:p-regular-20">
                {event.location}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 cursor-default">
              <p className="p-bold-20 text-grey-600">O čemu je reč:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <Link href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-medium-16 lg:p-regular-18 truncate text-[#42C1BA] underline cursor-pointer"
              >
                    {event.url}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* dogadjaji iz iste kategorije kao recommended */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Slični događaji:</h2>
        <Collection 
            data={relatedEvents?.data}
            emptyTitle="Nema sličnih događaja..."
            emptyStateSubtext="Probajte ponovo kasnije!"
            collectionType="All_Events"
            limit={3}
            page={searchParams.page as string}
            totalPages={relatedEvents?.totalPages}
          />
      </section>
    </>
  )
}

export default EventDetails