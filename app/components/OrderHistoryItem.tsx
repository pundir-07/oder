import { Button } from '@/components/ui/button'
import React from 'react'
import { CartItem } from '../types'

export default function OrderHistoryItem({ items, orderValue, date }: { items: CartItem[], orderValue: number, date: string }) {
    let orderText = ''
    items?.forEach((item, index) => {
        if (index !== items.length - 1) {
            orderText = orderText + item.name + `(${item.quantity}), `

        } else {
            orderText = orderText + item.name + `(${item.quantity}) `

        }
    })
    return (
        <div className='p-2 m-2 mt-10 border-b-4 '>
            <div className="flex justify-between items-center">
                <div className="text-xs font-light break-words w-60">{orderText}</div>
                <div className="text-sm ">₹{orderValue}</div>
            </div>
            <div className="mt-6 mb-1 flex gap-2 items-end justify-between">
                <div className="text-xs text-gray-600">{date}</div>
                <div className="flex gap-2">

                    <Button className='w-28 bg-white text-black border text-sm'>REORDER</Button>
                    <Button className='w-28 bg-white text-primary border text-sm'>RATE ORDER</Button>
                </div>
            </div>
        </div>
    )
}
