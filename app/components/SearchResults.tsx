import React from 'react'
import HorizontalScroll from './HorizontalScroll'
import { Item } from '../types'

export default function SearchResults({ query, items, onLoad }: { query: string, items: Item[], onLoad: () => void }) {
    const searchItems = items.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()))
    const itemNotFound = searchItems.length === 0;
    return (
        <>
            {itemNotFound && <p className='p-3 font-medium'>No results found for {`'${query}'`}</p>}
            <HorizontalScroll visible={true} onLoad={onLoad} items={searchItems} />
        </>
    )
}
