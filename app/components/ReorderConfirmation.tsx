import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useState } from "react"


export default function ReorderConfirmation({ orderText }: { orderText: string }) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className=''>
                <div className="w-28 border border-gray-800 rounded-md p-1 text-sm font-medium">
                    REORDER
                </div>
            </DialogTrigger>
            <DialogContent className="rounded-md max-w-[95%]">
                <DialogHeader className="relative w-full items-center gap-8">
                    <DialogTitle>Are you sure you want to repeat this order?</DialogTitle>
                    <p className="text-sm flex justify-start w-[90%] text-left">{orderText}</p>
                    <div className=" flex justify-between  w-[90%]  ">

                        <Button className="w-28 " onClick={() => { setOpen(false) }}>No</Button>
                        <Button className="w-28 " onClick={() => {
                            toast("This feature is currently under development")
                            setOpen(false)
                        }}>Yes</Button>
                    </div>
                </DialogHeader>

            </DialogContent>
        </Dialog>

    )
}
