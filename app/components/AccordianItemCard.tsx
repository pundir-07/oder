import { ChevronDown, ChevronUp, Minus, Plus, Star, ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Item } from '../types'
import { CartContext } from '../context/cartContext';

export default function AccordianItemCard({ item, onImageLoad }: { item: Item, onImageLoad: () => void }) {
    const { items, addToCart, removeFromCart } = useContext(CartContext);
    const [collapseDescription, setCollapseDescription] = useState(true)
    let isAdded = items?.find(i => i.id === item.id) ? true : false
    let count = items?.find(i => i.id === item.id)?.quantity || 0

    function handleAdd() {
        console.log("Adding item")
        if (!isAdded) {
            isAdded = true
        }
        count++
        addToCart(item)
    }
    function handleRemove() {
        count--
        if (count === 1) {
            isAdded = false
        }
        removeFromCart(item?.id)
    }
    return (
        <div className='w-full mt-6 mb-12'>
            <div className="flex justify-between">
                <div className="relative flex flex-col">
                    {item.isBestseller &&
                        <div className="flex items-center gap-1 text-red-700 absolute left-3 -top-3">

                            <ThumbsUp className='inline' size={10} /><p className='text-xxs'> Bestseller</p>
                        </div>}
                    <h1 className='text-lg px-2 font-semibold text-gray-800'>{item && item.name}{!item && "Food Item"}</h1>
                    <p className='text-gray-600 px-2 mt-1 '>₹{item.price}</p>
                    <div className="flex items-center gap-1 px-2 mt-1">
                        <Star color='#00763d' fill='#00763d' size={14} />
                        <p className='font-medium'>{item && item.rating}{!item.rating && 4.4}</p>
                        <p className='text-gray-600 '>{`(${item.ratingCount})`}</p>
                    </div>
                    <div className="relative" onClick={() => { setCollapseDescription(!collapseDescription) }}>

                        <div className={` pl-2  mt-1 text-xxs leading-snug text-gray-600 font-light w-40 transition-all ease-in-out duration-500 ${collapseDescription ? "h-10 overflow-hidden" : ""}`}>
                            {item.description}

                        </div>
                        {collapseDescription ?
                            <p className='absolute -right-4 -bottom-0' ><ChevronDown size={15} color='gray' /></p> :
                            <p className='absolute -right-4 -bottom-0' ><ChevronUp size={15} color='gray' /></p>}
                    </div>
                </div>
                <div className="relative">
                    <div className="relative w-36 h-36">

                        <Image
                            src={item.imageUrl || "/images/bg-food2.jpg"}
                            alt='food-item' fill
                            className={`rounded-3xl`}
                            unoptimized
                            onLoad={onImageLoad}
                            onLoadingComplete={onImageLoad} />
                        {isAdded && <div className='absolute flex px-1 items-center justify-between left-8 -bottom-2 bg-white  w-20 h-8 rounded-2xl shadow-xl text-primary font-medium text-base transition-all duration-500 active:scale-75'>
                            <Minus onClick={handleRemove} />
                            <p className=''>{count}</p>
                            <Plus onClick={handleAdd} />
                        </div>}
                        {!isAdded && <button className='absolute left-8 -bottom-2 bg-white border w-20 h-8 rounded-2xl shadow-xl text-primary font-medium text-base transition-all duration-500 active:scale-75' onClick={handleAdd}>ADD</button>}
                    </div>

                </div>
            </div>
        </div >
    )
}
