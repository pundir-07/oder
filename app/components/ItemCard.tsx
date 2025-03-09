"use client"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/app/components/ui/card"
import { Minus, Plus } from "lucide-react"
import { useContext } from "react"
import { CartContext } from "@/app/context/cartContext"
import { Item } from "@/app/types"
import Image from "next/image"


export default function ItemCard({ item, onImageLoad }: { item: Item, onImageLoad: () => void }) {
    // console.log("item in item card =====", item)
    const { items, addToCart, removeFromCart } = useContext(CartContext);
    // const [isAdded, setIsAdded] = useState(false);
    // const [count, setCount] = useState(0)
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
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className={`rounded-3xl`}
                        unoptimized
                        onLoad={onImageLoad}
                        onLoadingComplete={onImageLoad}
                    />
                </div>
            </CardContent>
            <CardFooter className="p-0 pb-2 flex gap-2 justify-between w-full items-start">
                <p className="text-sm font-medium w-20 whitespace-normal pl-2">{item.name}</p>

                <div className="pr-2 flex flex-col items-end">
                    <p className="text-sm font-bold">₹{item.price}</p>
                    <div className="flex gap-1 bg-white border border-primary rounded-md px-1 inset-shadow-lg shadow-sm items-center">

                        {isAdded &&

                            <Minus onClick={handleRemove} color="#F27C0D" size={20} />



                        }
                        {isAdded && <p className="text-sm">{count}</p>}
                        {isAdded ? <Plus onClick={handleAdd} color="#F27C0D" size={20} /> : <p className="text-sm text-primary px-1" onClick={handleAdd}>Add</p>}

                    </div>
                </div>
            </CardFooter>
        </Card>

    )
}
