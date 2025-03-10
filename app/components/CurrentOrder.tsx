import React, { useContext, useEffect, useState } from 'react'
import { Order } from '../types/order'
import { closeOrderInDatabase } from '../actions/order'
import { OrdersContext } from '../context/orderContext'
import OrderTimer from './OrderTimer'

export default function CurrentOrders({ order }: { order: Order }) {
    const { clearOrder } = useContext(OrdersContext)
    const [entry, setEntry] = useState(false)
    async function handleCloseOrder() {
        const orderClosed = await closeOrderInDatabase(order.id)
        if (orderClosed) {
            clearOrder()
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setEntry(true)

        }, 100)
    }, [])
    return (
        <div className={`relative mx-2 p-2 bg-white rounded-md transition-all ease-in-out duration-700 ${entry ? "translate-x-0 opacity-100" : "translate-x-60 opacity-0"}`}>
            <div className="absolute rounded-full w-2 h-2 bg-red-500 right-2 animate-pulse" onClick={handleCloseOrder}></div>

            <div className="flex justify-between items-center">

                <h1 className='text-sm font-medium bg-pink-100 rounded-md px-2 mb-1'>Current order </h1>
            </div>
            {order.items.map(item => {
                return (<div key={item.id} className="flex mt-1 px-2 justify-between w-48">
                    <p className='text-gray-500 text-xs '>{item.name}</p>
                    <div className="flex gap-2 items-center">

                        <p className='text-gray-500 text-xs '>x {item.quantity}</p>
                        <OrderTimer />
                    </div>
                </div>)
            })}
            <div className="flex justify-between items-center mt-4 px-2">
                <div className="flex gap-2 items-center">
                    <p className='text-sm text-gray-500'>Order Total</p>
                    <p className='text-sm font-medium'>₹{order.value}</p>
                </div>
                {/* <button className='border-2 border-green rounded-lg px-2 text-green font-medium text-sm transition-all duration-150 active:scale-95 active:translate-y-1'>Pay Now</button> */}
                {!order.isPayed && <button className='border-2 border-green bg-green text-white rounded-lg px-2 py-1 text-green font-medium text-xs transition-all duration-150 active:scale-90' >Pay Now</button>}
                {order.isPayed && <button className='  bg-gold text-gray-600 rounded-lg px-2 py-1 text-green font-medium text-xs transition-all duration-150 active:scale-90'>Payed</button>}


            </div>

        </div>
    )
}
