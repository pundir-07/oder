
import { User } from "lucide-react"
import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"


export default function UserDropdown() {
    const { removeUser } = useContext(UserContext)
    const [showDropDown, setShowDropDown] = useState(false)
    const router = useRouter()

    function toggleDropdown() {
        setShowDropDown(!showDropDown)
    }
    return (
        <div className="relative shadow-sm ">
            <User color="white" onClick={toggleDropdown} />
            {showDropDown && <motion.div
                initial={{ opacity: 0, }}
                animate={{ opacity: 100, }}
                exit={{ opacity: 0, }}
                transition={{ duration: .3 }}
            >
                <div className={`absolute z-100 top-8 right-1 w-24 py-2 bg-white rounded-md }`}>
                    <DropDownElement text="My Orders" onClick={() => { router.push("/order-history") }} />
                    <DropDownElement text="Log Out" noBorder={true} onClick={() => { removeUser() }} />
                </div >
            </motion.div>}
        </div>




    )
}

export function DropDownElement({ text, noBorder, onClick }: { text: string, noBorder?: boolean, onClick: () => void }) {
    return <button className={`${noBorder ? "" : "border-b-2 border-dashed border-gray-300"}  px-2 py-1 text-sm font-medium text-gray-700   ripple-btn rounded-lg relative overflow-hidden`} onClick={onClick}>
        {text}
    </button>
}
