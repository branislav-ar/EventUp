'use client'

import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { getAllCategories } from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/database/models/category.model';

const CategoryFilter = () => {

    const router = useRouter();
    const searchParams = useSearchParams()
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories();
        
            categoryList && setCategories(categoryList as ICategory[]);
        }

        getCategories();
    }, [])

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         let newUrl = '';
    //         if(categories) {
    //             newUrl = formUrlQuery({
    //                 params: searchParams.toString(),
    //                 key: 'categories',
    //                 value: categories
    //             })
    //         } else {
    //             newUrl = removeKeysFromQuery({
    //                 params: searchParams.toString(),
    //                 keysToRemove: ['query']
    //             })
    //         }

    //         router.push(newUrl, { scroll: false });
    //     }, 300)

    //     return () => clearTimeout(delayDebounceFn)
    // }, [categories, searchParams, router])

    const onSelectCategory = (category: string) => {
        let newUrl = '';
        if(categories && category !== 'All') {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: category
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['category']
            })
        }

        router.push(newUrl, { scroll: false });
    }

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className="select-field">
            <SelectValue placeholder="Kategorija" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="All" className="select-item p-regular-14 text-[#42C1BA] hover:bg-primary-50 focus:text-[#42C1BA]">
                Sve kategorije...
            </SelectItem>
        
            {categories.map((category) => (
                <SelectItem
                    value={category.name}
                    key={category._id}
                    className="select-item p-regular-14"
                >
                    {category.name}
                </SelectItem>
            ))}
        
        </SelectContent>
        </Select>
    )
    }

export default CategoryFilter