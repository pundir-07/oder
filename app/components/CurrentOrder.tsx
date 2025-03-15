import React, { useContext, useEffect, useState } from 'react'
import { Order } from '../types/order'
import { OrdersContext } from '../context/orderContext'
import OrderCountdown from './OrderCountdown'
import { Loader2 } from 'lucide-react'

export default function CurrentOrders({ order }: { order: Order }) {
    const { deadOrder, processPayment } = useContext(OrdersContext)
    const [entry, setEntry] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setEntry(true)

        }, 100)
    }, [])


    return (
        <div className={`relative mx-2 p-2 bg-white rounded-md shadow-sm transition-all ease-in-out duration-700 ${entry ? "translate-x-0 opacity-100" : "translate-x-60 opacity-0"}`}>
            <div className=" absolute flex right-2 items-center gap-1">
                <OrderCountdown order={order} />
                <div className={` rounded-full w-2 h-2 ${deadOrder ? "bg-gray-800" : "bg-red-500  animate-pulse"} `} ></div>
            </div>

            <div className="flex justify-between items-center">

                <h1 className='text-sm font-medium bg-pink-100 rounded-md px-2 mb-1'>{deadOrder ? "Order Served" : "Current order"} </h1>
            </div>
            {order.items.map(item => {
                return (<div key={item.id} className="flex mt-1 px-2 gap-4 w-48">
                    <p className='text-gray-500 text-xs '>{item.name}</p>
                    <div className="flex gap-2 items-center">

                        <p className='text-gray-500 text-xs '>x {item.quantity}</p>
                        {/* <OrderTimer /> */}
                    </div>
                </div>)
            })}

            <div className="flex justify-between items-center mt-4 px-2">
                <div className="flex gap-2 items-center">
                    <p className='text-sm text-gray-500'>Order Total</p>
                    <p className='text-sm font-medium'>₹{order.value}</p>
                </div>
                {/* <button className='border-2 border-green rounded-lg px-2 text-green font-medium text-sm transition-all duration-150 active:scale-95 active:translate-y-1'>Pay Now</button> */}
                {!order.isPaid &&
                    <div className="border-2 border-green bg-green text-white rounded-lg flex items-center justify-center w-16 h-6 font-medium text-xs transition-all duration-150 active:scale-90 "
                        onClick={() => {
                            setLoading(true)
                            processPayment()
                        }}>

                        {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : "Pay Now"}
                    </div>
                }

                {order.isPaid &&
                    <button
                        className='bg-gold text-gray-900 rounded-lg px-2 py-1 text-green font-medium text-xs transition-all duration-150 active:scale-90'>
                        <h1 className='text-black'>Paid</h1>
                    </button>}


            </div>

        </div>
    )
}
