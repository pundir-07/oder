
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Label } from '@/components/ui/label'
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { checkUser, createUser } from '../actions/user'
import { UserContext } from '../context/userContext'
import Button_WL from './Button_WL'

function validatePhone(phone: string) {
    if (phone.trim().length !== 10)
        return { valid: false, error: "Please enter a valid 10 digit number" }
    return { valid: true, error: "" }
}
function validateName(name: string) {
    if (name.length < 3 || name.length > 16) {
        return { valid: false, error: "Name should be 4-16 characters" }
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
        return { valid: false, error: "Name cannot contain special characters and numbers" }
    }
    return { valid: true, error: "" }
}
export default function LoginForm() {
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [step, setStep] = useState<number>(1)
    const [error, setError] = useState<string>("")
    const [click, setClick] = useState(0)
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useContext(UserContext)
    const phoneRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    useEffect(() => {
        if (step === 1 && phoneRef.current) {
            phoneRef.current.focus()
        }
        if (step === 2 && nameRef.current) {
            nameRef.current.focus()
        }

    }, [step, click])
    useEffect(() => {
        if (user.id) {
            router.push("/welcome-page")
        }
    }, [user, router])

    async function handleClick() {
        setClick(p => p + 1)
        if (step === 1) {
            if (!validatePhone(phone).valid) {
                setError(validatePhone(phone).error)
                return
            }
            setError("")
            setLoading(true)
            const { error, user } = await checkUser(phone)
            if (!error && user) {
                console.log("Setting user now...old user", user)
                setUser(user)
                console.log("after set user call", user)
                return
            }
            setStep(2)
            setLoading(false)
            return
        }
        if (step === 2) {
            if (!validateName(name)?.valid) {
                setError(validateName(name).error)
                return
            }
            setError("")
            setLoading(true)
            const { user } = await createUser({ id: "", phone, name })
            if (user) {
                console.log("Setting user now..new user", user)
                setUser(user)
            }
        }
    }


    return (
        <div className='p-2 flex flex-col gap-2'>
            {step == 1 && <motion.div
                initial={{ opacity: 0, x: 100 }}  // Entry animation (starts hidden & moved up)
                animate={{ opacity: 1, x: 0 }}    // When mounted (visible & normal position)
                exit={{ opacity: 0, x: -100 }}     // When unmounted (fade out & move up)
                transition={{ duration: 0.3 }}    // Smooth transition
            >
                <Label className='text-gray-500'>{step == 1 && "Please enter your phone number"}</Label>

            </motion.div>}
            {step == 2 && <motion.div
                initial={{ opacity: 0, x: 100 }}  // Entry animation (starts hidden & moved up)
                animate={{ opacity: 1, x: 0 }}    // When mounted (visible & normal position)
                exit={{ opacity: 0, x: -100 }}     // When unmounted (fade out & move up)
                transition={{ duration: 0.3 }}    // Smooth transition
            >

                <Label className='text-gray-500'>{step == 2 && "Please enter your name"}</Label>
            </motion.div>}


            {step === 1 && <Input
                ref={phoneRef}
                value={phone}
                onChange={(e) => { setPhone(e.target.value) }}
                inputMode='numeric'
                onKeyDown={(e) => {
                    if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
                        e.preventDefault(); // Block non-numeric keys
                    }
                }}
            />}

            {step === 2 &&

                <Input
                    ref={nameRef}
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
            }
            <p className="text-xs text-red-400">{error}</p>



            <Button_WL loading={loading} text="Next" onClick={handleClick} />

        </div>
    )
}
