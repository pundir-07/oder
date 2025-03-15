import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Loader2, LogOut } from "lucide-react"

import { useContext, useState, } from "react"
import { UserContext } from "../context/userContext"

export default function LogOutConfirmation() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { removeUser } = useContext(UserContext)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className=''>
                <div className="flex items-center gap-2 p-4 pt-2 text-sm font-medium active:bg-gray-900 active:text-white ">
                    <p>
                        Logout
                    </p>
                    <LogOut size={15} />
                </div>
            </DialogTrigger>
            <DialogContent className="rounded-md max-w-[95%]">
                <DialogHeader className="relative w-full items-center gap-8">
                    <DialogTitle>Are you sure you want to logout?</DialogTitle>
                    <div className=" flex justify-between  w-full px-8 ">

                        <Button className="w-28 active:scale-90 transition-all duration-200 ease-in-out" onClick={() => { setOpen(false) }} >No</Button>
                        <Button className="w-28 active:scale-90 transition-all duration-200 ease-in-out" onClick={() => {
                            setLoading(true)
                            removeUser()
                        }}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes"}</Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
