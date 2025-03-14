"use client"
import React from 'react'
import HorizontalScroll from './HorizontalScroll'
import { Item } from '@/app/types'
import { useState } from 'react'
import HorizontalLoading from './HorizontalLoading'
import { Tag } from 'lucide-react'
export default function BestSellers({ items }: { items: Item[] }) {
    const [imagesLoadedCount, setImagesLoadedCount] = useState(0)
    const loadingComplete = imagesLoadedCount >= items.length
    // console.log(`items number in bestseller - ${items.length}`)
    // console.log(`images loaded in bestseller - ${imagesLoadedCount} `)
    return (
        <div className='relative bg-white py-2'>
            <h2 className="px-4 pb-2 text-lg font-semibold flex items-center gap-1">BestSellers <Tag size={15} color='red' strokeWidth={3} /></h2>
            {!loadingComplete && <HorizontalLoading />}
            {<HorizontalScroll visible={loadingComplete} onLoad={() => setImagesLoadedCount(prev => prev + 1)} items={items} />}

        </div>
    )
}
