import React from 'react'
import { SkeletonCard } from './SkeletonCard'

export default function HorizontalLoading() {
    return (
        <div className="w-full overflow-x-auto scrollbar-hide whitespace-nowrap px-4 ">
            <div className="inline-flex space-x-4">

                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    )
}
