import { useEffect, useState } from "react"
import useMurojaah from "../hooks/useMurojaah"

export default function JuzSelection(){
    const { juz, setJuz } = useMurojaah()

    const options = [...Array(30)].map((i: number, data: number) => {
        const q = data + 1
        return {
            key: q,
            label: `Juz ${q}`
        }
    })

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value === ""){
            setJuz("")
            return
        }
        setJuz(parseInt(e.target.value))
    }
    
    return (
        <select value={juz} onChange={onChange} className="select select-bordered w-full">
            <option value="">-- choose --</option>
            {
                options.map(option => (
                    <option key={option.key} value={option.key}>{ option.label }</option>
                ))
            }
        </select>
    )
}