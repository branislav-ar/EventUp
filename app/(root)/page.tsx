import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import Category from "@/lib/database/models/category.model";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";

export default async function Home({ searchParams }: SearchParamProps) {
  
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';
  
  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  });

  return (
    <>
        <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-3">
          <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-2 2xl:gap-0">
            
            <div className="flex flex-col justify-center gap-7">
              <h1 className="h1-bold">Organizujte, povežite se i proslavite:<br />Vaši događaji,<br />naša platforma!</h1>
              <p className="p-regular-10 md:p-regular-20">Pridružite se našoj zajednici i otkrijte nove avanture: kreirajte i učestvujte u događajima u vašoj okolini uz samo nekoliko klikova.</p>
              <Button size="lg" asChild className="button w-full sm:w-fit bg-[#395E6F] hover:bg-[#4b6977]">
                <Link href="#events">
                  Istražite sada!
                </Link>
              </Button>
            </div>

            <Image
              src="/assets/images/hero.png"
              alt="hero"
              width={1000}
              height={1000}
              className="max-h-[80vh] object-contain object-center 2xl:max-h-[50vh]"
            >

            </Image>
          </div>
        </section>

        <section id="events" className="wrapper my-2 flex flex-col gap-8 md:gap-12">
          <section id="events" className="wrapper my-2 flex flex-col gap-0.5 md:gap-1">
            <h2 className="sm:h1-bold h2-bold">
              1000+
            </h2>
            <h2 className="sm:h3-bold h2-bold">
              zadovoljnih korisnika!
            </h2>
          </section>
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <Search placeholder="Pretražite po imenu događaja..." />
            <CategoryFilter />
          </div>

          <Collection 
            data={events?.data}
            emptyTitle="Trenutno nema događaja..."
            emptyStateSubtext="Probajte ponovo kasnije!"
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events?.totalPages}
          />
          
        </section>
    </>
  );
}
