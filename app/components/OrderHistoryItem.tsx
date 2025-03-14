import React from 'react'
import RateOrderButton from './RateOrderButton'
import { Star } from 'lucide-react'
import { Order } from '../types/order'
import ReorderConfirmation from './ReorderConfirmation'

export default function OrderHistoryItem({ order, date }: { date: string, order: Order }) {
    console.log("99999999999999999999999====", order)
    let orderText = ''
    order?.items?.forEach((item, index) => {
        if (index !== order.items.length - 1) {
            orderText = orderText + item.name + `(${item.quantity}), `

        } else {
            orderText = orderText + item.name + `(${item.quantity}) `

        }
    })
    return (
        <div className='p-2 m-2 mt-10 border-b-4 '>
            <div className="flex justify-between items-center">
                <div className="text-xs font-light break-words w-60">{orderText}</div>
                <div className="text-sm ">₹{order?.value}</div>
            </div>
            <div className="mt-6 mb-1 flex gap-2 items-end justify-between">
                <div className="text-xs text-gray-600 w-28">{date}</div>
                {order?.status === "COMPLETED" ?
                    <div className="flex w-72 justify-between">

                        <ReorderConfirmation orderText={orderText} />
                        {order?.rating ?
                            <div className='relative pl-2 py-1 flex bg-red-100 rounded-lg w-28'>
                                <p className='text-xxs w-[50%]'>You rated this order</p>
                                <div className=" flex items-center left-0 -top-2">
                                    <Star color='#00763d' fill='#00763d' size={14} />
                                    <p className='font-medium text-sm'>{order?.rating.toFixed(1)}</p>
                                </div>
                            </div>
                            :
                            <RateOrderButton items={order?.items} orderId={order?.id} />}
                    </div> :
                    <p className='text-green text-sm w-72 flex justify-end'>PENDING</p>
                }

            </div>
        </div>
    )
}
