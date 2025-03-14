import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Item } from "../types"
import { useContext, useEffect, useRef, useState } from "react"
import { Loader2, Star } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "./ui/button"
import { Rating } from "../types/review"
import { UserContext } from "../context/userContext"
import { addRatings, addReview, } from "../actions/review"
import { useRouter } from "next/navigation"

export default function RateOrderButton({ items, orderId }: { items: Item[], orderId: string }) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext)
    const [reviewText, setReviewText] = useState('')
    const router = useRouter()
    const initialRatings: Rating[] = [];
    items.forEach(i => {
        initialRatings.push({ itemId: i.id, rating: null, customerId: user.id })
    })
    console.log("initial ratings--", initialRatings)
    const [ratings, setRatings] = useState<Rating[]>(initialRatings)

    const notRated = ratings.reduce((r, curr) => { return r + (curr.rating || 0) }, 0) === 0 ? true : false

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.blur()
        }
    }, [textAreaRef])
    function setItemRating(id: number, rating: number) {
        setRatings(prev => {
            const newRatings = prev.map(r => {
                if (r.itemId === id) {
                    return { ...r, rating: rating }
                }
                return r
            })
            return newRatings
        })
        console.log("ITEMS RATINGS CURRENT------", ratings)
        if (textAreaRef.current) {
            textAreaRef.current.focus()
        }
    }
    async function handleSubmit() {
        console.log("Final ratings before submission ====", ratings)
        console.log(reviewText)
        setLoading(true)
        const createdRatings = await addRatings(ratings, orderId)
        console.log("Ratings created in DB", createdRatings)
        const createdReivew = await addReview({ customerId: user.id, orderId, text: reviewText })
        console.log("Review created in DB", createdReivew)

        router.replace("/rating-success")
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='w-28 bg-white text-primary border border-primary rounded-md text-sm font-medium' >RATE ORDER</DialogTrigger>
            <DialogContent className="max-w-[95%] rounded-lg">
                <DialogHeader>
                    <DialogTitle>Rate Items from your order</DialogTitle>
                    <div className="pt-4">
                        {items?.map((item) => {
                            return <div key={item.id} className="flex justify-between items-center">
                                <div className="font-medium">{item.name}</div>
                                <StarRating itemId={item.id} setItemRating={setItemRating} />
                            </div>
                        })}
                        <Textarea
                            ref={textAreaRef}
                            placeholder="How was your meal? Let us know what you loved or what could be improved!"
                            className="mt-4 text-xs placeholder:text-gray-400 placeholder:italic min-h-20 max-h-32 h-auto"
                            value={reviewText}
                            onChange={(e) => { setReviewText(e.target.value) }}
                        />

                        <div className="flex justify-end">
                            <Button className="mt-4 w-24" onClick={handleSubmit} disabled={notRated} >{loading ? <Loader2 className="w-8 h-8 text-white animate-spin" /> : "Submit"}</Button>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export function StarRating({ itemId, setItemRating }: { itemId: number, setItemRating: (id: number, rating: number) => void }) {
    const [rating, setRating] = useState(0)
    useEffect(() => {
        setItemRating(itemId, rating)
    }, [rating])
    return <div className="flex items-center p-1">
        <Star
            color="#ff7b00"
            onClick={() => {
                setRating(1)
            }}
            fill={rating >= 1 ? "#ff7b00" : "#fff"}
            className="px-1" size={40} />
        <Star
            color="#ff7b00"
            onClick={() => {
                setRating(2)
            }}
            fill={rating >= 2 ? "#ff7b00" : "#fff"}
            className="px-1" size={40} />
        <Star
            color="#ff7b00"
            onClick={() => {
                setRating(3)
            }}
            fill={rating >= 3 ? "#ff7b00" : "#fff"}
            className="px-1" size={40} />
        <Star
            color="#ff7b00"
            onClick={() => {
                setRating(4)
            }}
            fill={rating >= 4 ? "#ff7b00" : "#fff"}
            className="px-1" size={40} />
        <Star
            color="#ff7b00"
            onClick={() => {
                setRating(5)
            }}
            fill={rating >= 5 ? "#ff7b00" : "#fff"}
            className="px-1" size={40} />
    </div>
}
