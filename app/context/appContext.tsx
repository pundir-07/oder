// "use client"
// import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";


// interface AppContextType {
//     loading: boolean,
//     setLoading: Dispatch<SetStateAction<boolean>>
//     value: number
// }
// export const AppContext = createContext<AppContextType>({ loading: false, setLoading: () => { }, value: 0 })


// export default function AppProvider({ children }: { children: ReactNode }) {
//     const [loading, setLoading] = useState<boolean>(false)
//     const [value, setValue] = useState<number>(0)
//     useEffect(() => {
//         let interval: number
//         if (loading) {
//             interval = setInterval(() => {
//                 setValue((prev) => {
//                     if (prev >= 100) {
//                         clearInterval(interval);
//                         setLoading(false)
//                         return 100;
//                     }
//                     return prev + 10; // Increment progress by 10 every 100ms
//                 });
//             }, 100);

//         }
//         return () => { clearTimeout(interval) }
//     }, [loading])


//     return <AppContext.Provider value={{ loading, setLoading, value }}>
//         {children}
//     </AppContext.Provider>
// }