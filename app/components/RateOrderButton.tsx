
import { Item } from "../types"
import { useContext, useEffect, useRef, useState } from "react"
import { Loader2, Star, X } from "lucide-react"
import { Button } from "./ui/button"
import { Rating } from "../types/review"
import { UserContext } from "../context/userContext"
import { addRatings, addReview, } from "../actions/review"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

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
        if (open && textAreaRef.current) {
            textAreaRef.current.blur()
            // document.getElementById("dialog-title")?.focus();
        }
    }, [textAreaRef, open])

    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [open]);


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
    if (!open) {
        return <div onClick={() => { setOpen(true) }} className="w-28 border border-primary bg-white text-primary rounded-md p-1 text-sm text-center font-medium active:border-2"> RATE ORDER</div>
    } else {


        return <AnimatePresence>
            <div className="fixed top-0 left-0 w-full h-screen bg-black/75 flex items-center justify-center z-10"
                onClick={() => setOpen(false)}
            >

                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.1 }}
                        className="bg-white rounded-md w-[95%] max-h-[70%] z-20 p-6 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div

                        >
                            <header className="relative flex justify-center items-center">
                                <h2 className="text-xl font-medium">Rate items from your order</h2>
                                <X
                                    className="absolute right-0 cursor-pointer"
                                    onClick={() => setOpen(false)}
                                />
                            </header>
                            <div className="pt-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div className="font-medium text-sm">{item.name}</div>
                                        <StarRating itemId={item.id} setItemRating={setItemRating} />
                                    </div>
                                ))}
                                <textarea
                                    ref={textAreaRef}
                                    autoFocus={false}
                                    placeholder="How was your meal? Tell us what you loved or what could be better!"

                                    className="mt-4 text-xs w-full p-2 border border-gray-400 rounded-lg min-h-20 max-h-32 h-auto placeholder:italic"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                />
                                <div className="flex justify-end">
                                    <Button
                                        className="mt-4 w-24"
                                        onClick={handleSubmit}
                                        disabled={notRated || loading}
                                    >
                                        {loading ? <Loader2 className="w-8 h-8 text-white animate-spin" /> : "Submit"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </AnimatePresence>


    }

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
            className="px-1" size={30} />
        <Star
            color="#ff7b00"
            onClick={() => {
                setRating(2)
            }}
            fill={rating >= 2 ? "#ff7b00" : "#fff"}
            className="px-1" size={30} />
        <Star
            color="#ff7b00"
            onClick={() => {
                setRating(3)
            }}
            fill={rating >= 3 ? "#ff7b00" : "#fff"}
            className="px-1" size={30} />
        <Star
            color="#ff7b00"
            onClick={() => {
                setRating(4)
            }}
            fill={rating >= 4 ? "#ff7b00" : "#fff"}
            className="px-1" size={30} />
        <Star
            color="#ff7b00"
            onClick={() => {
                setRating(5)
            }}
            fill={rating >= 5 ? "#ff7b00" : "#fff"}
            className="px-1" size={30} />
    </div>
}
