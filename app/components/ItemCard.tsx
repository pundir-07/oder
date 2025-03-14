"use client"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/app/components/ui/card"
import { Minus, Plus, Star } from "lucide-react"
import { useContext } from "react"
import { CartContext } from "@/app/context/cartContext"
import { Item } from "@/app/types"
import Image from "next/image"


export default function ItemCard({ item, onImageLoad }: { item: Item, onImageLoad: () => void }) {
    const { items, addToCart, removeFromCart } = useContext(CartContext);

    let isAdded = items.find(i => i.id === item.id) ? true : false
    let count = items.find(i => i.id === item.id)?.quantity || 0

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
        removeFromCart(item.id)
    }
    return (
        <Card className=" flex flex-col items-center w-40 ">

            <CardContent className="relative w-full h-40 p-2">
                <div className="relative w-full h-full">
                    <Image
                        src={item.imageUrl || "/images/bg-food2.jpg"}
                        alt={item.name}
                        fill
                        className={`rounded-3xl`}
                        unoptimized
                        onLoad={onImageLoad}
                        onLoadingComplete={onImageLoad}
                    />
                </div>
                <div className="absolute right-2 bottom-2 flex gap-1 bg-white  rounded-xl px-2 py-1 inset-shadow-lg shadow-xl items-center transition-all active:scale-75 duration-500">

                    {isAdded &&

                        <Minus onClick={handleRemove} color="#F27C0D" size={16} />



                    }
                    {isAdded && <p className="text-sm text-primary font-medium">{count}</p>}
                    {isAdded ? <Plus onClick={handleAdd} color="#F27C0D" size={16} /> : <p className="text-sm text-primary px-1 font-medium" onClick={handleAdd}>ADD</p>}

                </div>
            </CardContent>
            <CardFooter className="p-0 pb-2 flex gap-2 justify-between w-full items-start">
                <div className="flex flex-col">

                    <p className="text-xs font-medium w-30 whitespace-normal pl-2">{item.name}</p>
                    <div className="flex items-center gap-1 px-2 mt-1 text-xs">
                        <Star color='#00763d' fill='#00763d' size={14} />
                        <p className='font-medium'>{item && item.rating}{!item.rating && 4.4}</p>
                        <p className='text-gray-600 '>{`(${item.ratingCount})`}</p>
                    </div>
                </div>

                <div className="pr-2 flex flex-col items-end">
                    <p className="text-sm text-gray-600">₹{item.price}</p>

                </div>
            </CardFooter>
        </Card>

    )
}
