"use client"
import React from 'react'
import CategorySelector from './CategorySelector'
import HorizontalScroll from './HorizontalScroll'
import { Item } from '@/app/types'
import { useState } from 'react'
import HorizontalLoading from './HorizontalLoading'

export default function Categories({ items }: { items: Item[] }) {
    const [imagesLoadedCount, setImagesLoadedCount] = useState(0)
    const [selected, setSelected] = useState<string>("DRINKS")
    const selectedItems = items.filter(item => item.category.toString() === selected)
    const loadingComplete = imagesLoadedCount >= selectedItems.length
    console.log(`${selected} items = ${selectedItems.length}`)
    console.log(`images loaded in categories - ${imagesLoadedCount} `)
    function handleSelected(category: string) {
        setSelected(category)
        setImagesLoadedCount(0)
    }
    return (
        <div className="bg-white py-4 ">

            <div className='flex items-center justify-between px-4 pb-4'>
                <h1 className='text-xl font-semibold'>Categories</h1>
                <CategorySelector handleSelected={handleSelected} />
            </div>
            {!loadingComplete && <HorizontalLoading />}
            <HorizontalScroll visible={loadingComplete} onLoad={() => {
                console.log(`Loading image..`)
                setImagesLoadedCount(prev => prev + 1)
            }} items={selectedItems} />
        </div>
    )
}
