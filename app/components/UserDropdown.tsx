
import { User } from "lucide-react"
import { motion } from "framer-motion"
import LogOutConfirmation from "./LogoutConfirmation"

import { useState } from "react"
import Link from "next/link"

export default function UserDropdown() {
    const [showDropDown, setShowDropDown] = useState(false)

    function toggleDropdown() {
        setShowDropDown(!showDropDown)
    }
    return (
        <div className="relative shadow-sm  ">
            <User color="white" onClick={toggleDropdown} />
            {showDropDown && <motion.div
                initial={{ opacity: 0, }}
                animate={{ opacity: 100, }}
                exit={{ opacity: 0, }}
                transition={{ duration: .3 }}
            >
                <div className={`absolute z-100 top-8 right-1 bg-red-50 rounded-md shadow-md}`}>

                    <Link href={"/order-history"} >
                        <div className="p-4 pb-1  text-sm font-medium active:bg-gray-900 active:text-white text-nowrap ">My Orders</div>
                    </Link>
                    <LogOutConfirmation />
                </div >
                <div className="fixed top-0 left-0 w-full h-full z-30" onClick={() => setShowDropDown(false)}></div>
            </motion.div>}
        </div>




    )
}


