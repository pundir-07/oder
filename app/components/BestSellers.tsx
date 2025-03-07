"use client"
import React from 'react'
import HorizontalScroll from './HorizontalScroll'
import { Item } from '@/app/types'
import { useState } from 'react'
import HorizontalLoading from './HorizontalLoading'
export default function BestSellers({ items }: { items: Item[] }) {
    const [imagesLoadedCount, setImagesLoadedCount] = useState(0)
    const loadingComplete = imagesLoadedCount >= items.length
    console.log(`items number in bestseller - ${items.length}`)
    console.log(`images loaded in bestseller - ${imagesLoadedCount} `)
    return (
        <div className='relative bg-white py-4'>
            <h2 className="px-4 pb-2 text-xl font-semibold ">BestSellers</h2>
            {!loadingComplete && <HorizontalLoading />}
            {<HorizontalScroll visible={loadingComplete} onLoad={() => setImagesLoadedCount(prev => prev + 1)} items={items} />}

        </div>
    )
}
