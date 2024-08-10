import { z } from "zod"

export const eventFormSchema = z.object({
    title: z.string()
    .min(3, {
        message: "Naslov mora da sadrži bar 3 karaktera."
    }),
    description: z.string()
    .min(3, {
        message: "Opis mora da sadrži bar 3 karaktera."
    }).
    max(400, {
        message: "Opis mora biti kraći od 400 karaktera."
    }),
    location: z.string()
    .min(3, {
        message: "Lokacija mora da sadrži bar 3 karaktera."
    })
    .max(400, {
        message: "Lokacija mora biti kraća od 400 karaktera."
    }),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url({ 
        message: "Neispravan URL."
    })
})