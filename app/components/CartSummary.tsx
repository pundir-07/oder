import React from 'react'
import { CartItem } from '../types'
import { Button } from './ui/button'

export default function CartSummary({ items }: { items: CartItem[] }) {
    const itemTotal = items.reduce((sum, item) => item.price * item.quantity + sum, 0)
    if (items.length === 0) {
        return <p className='my-8'>Please add something to the cart to place order</p>
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
            <Button className="w-full mt-5 text-xl h-10 ">Checkout -&gt; </Button>
        </div>
    )
}
