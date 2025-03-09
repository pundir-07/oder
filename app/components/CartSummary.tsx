import React, { useContext, useState } from 'react'
import { CartItem } from '../types'
import { Button } from './ui/button'
import { createOrderInDatabase } from '../serverActions/order'
import { UserContext } from '../context/userContext'
import { OrdersContext } from '../context/orderContext'
import { CartContext } from '../context/cartContext'

export default function CartSummary({ items, closeSheet }: { items: CartItem[], closeSheet: () => void }) {
    const [error, setError] = useState("")
    const itemTotal = items.reduce((sum, item) => item.price * item.quantity + sum, 0)
    const { createOrder } = useContext(OrdersContext);
    const { clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext)
    if (items.length === 0) {
        return <p className='my-8'>Please add something to the cart to place order</p>
    }
    async function placeOrder() {
        const order = await createOrderInDatabase(items, user.id)
        if (!order) {
            setError("Error placing Order!")
            closeSheet()
            return
        }
        createOrder(order)
        clearCart()
        closeSheet()
    }
    return (
        <div>
            <div className="text-sm text-muted-foreground">
                {items.map(item => {
                    return <div className="flex justify-between items-center" key={item.id}>
                        <p className="text-md my-2">{item.name} </p>
                        <div className="flex items-center justify-between w-16">
                            <p>x{item.quantity}</p>
                            <p>{`₹${item.quantity * item.price}`}</p>
                        </div>
                    </div>
                })}
            </div>
            <div className="w-full flex justify-between mt-5 mb-1">
                <p className='font-normal text-sm '>Item Total</p>
                <p className='font-normal text-sm '>₹{itemTotal}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className='font-normal text-sm '>GST and Restaurant Charges</p>
                <p className='font-normal text-sm '>₹{itemTotal * 0.02}</p>
            </div>
            <div className="w-full flex justify-between mt-4">
                <p className='font-medium text-sm '>To Pay</p>
                <p className='font-medium text-sm '>₹{itemTotal * 0.02 + itemTotal}</p>
            </div>
            <div className="w-full h-20 "></div>
            <Button className="w-full mt-5 text-xl h-10 " onClick={placeOrder}>Place Order </Button>
        </div>
    )
}
