"use client";
import { useState } from "react";
import { checkUser, createUser } from "../serverActions/user";

export default function UserModal({ onSave }: { onSave: (id: string, name: string, phone: string) => void }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [step, setStep] = useState<number>(1)
    const [error, setError] = useState("")
    const [user, setUser] = useState("")

    const handleButton = async () => {
        if (!isValidPhoneNumber(phone)) {
            setError("Please enter a valid phone number")
            return
        }
        if (step === 1) {
            const user = await checkUser(phone)
            if (user) {
                localStorage.setItem("userInfo", JSON.stringify({ id: user.id, name: user.name, phone: user.phone }));
                setStep(3)
                setUser(user.name)
                setTimeout(() => {
                    onSave(user.id, user.name, user.phone)
                }, 2500)
            } else {
                setStep(2)
            }
            return
        }
        if (step === 2) {
            if (name.length < 3) {
                setError("Please enter a valid name")
                return
            }
            setStep(3)
            setUser(name)
            const createdUser = await createUser({ name, phone })
            localStorage.setItem("userInfo", JSON.stringify({ id: createdUser?.id, name, phone }));
            setTimeout(() => {
                onSave(createdUser?.id, name, phone)
            }, 2500)
        }
    };
    function isValidPhoneNumber(phone: string): boolean {
        return /^[0-9]{10}$/.test(phone);
    }

    switch (step) {
        case 1: return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 z-20">
                <h2 className="text-xl font-semibold mb-2">Welcome to The Cuisine</h2>
                <p className="text-xs font-light mb-2 ">Please enter your number </p>

                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <p className="text-red-700 text-xs">{error}</p>
                <button
                    onClick={handleButton}
                    className="bg-primary text-white px-4 py-2 rounded w-full"
                >
                    Proceed
                </button>

            </div>
        </div>);
        case 2: return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 z-20">
                <h2 className="text-xl font-semibold mb-2">Welcome to The Cuisine</h2>
                <p className="text-xs font-light mb-2 ">Please enter your name </p>
                {step == 2 && <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                        let uppercasename = e.target.value
                        if (uppercasename.length > 0) {
                            uppercasename = uppercasename.charAt(0).toUpperCase() + uppercasename.slice(1)
                        }
                        setName(uppercasename)
                    }}
                    className="w-full p-2 border rounded mb-2"
                />}


                <p className="text-red-700 text-xs">{error}</p>
                <button
                    onClick={handleButton}
                    className="bg-primary text-white px-4 py-2 rounded w-full"
                >
                    Proceed
                </button>

            </div>
        </div>
        case 3: return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 z-20 flex justify-center">
                <div className="">

                    <p className="text-xl font-medium inline ">Welcome </p><p className="text-2xl font-medium inline">{user}!</p>
                </div>

            </div>
        </div>
    }

}
