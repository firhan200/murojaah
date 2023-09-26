'use client'

import { MurojaahProvider } from "../contexts/MurojaahContext";

export default function MurojaahApp({ children }: {children: React.ReactNode}){
    return <MurojaahProvider>{ children }</MurojaahProvider>
}