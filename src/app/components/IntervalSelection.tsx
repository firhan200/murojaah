import { SelectHTMLAttributes } from "react"
import useMurojaah from "../hooks/useMurojaah"

export default function IntervalSelection(){
    const { selectInterval } = useMurojaah()

    const options = [...Array(5)].map((i: number, data: number) => {
        const seconds = (data + 1) * 5
        return {
            key: seconds,
            label: `${seconds} seconds`
        }
    })

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectInterval(parseInt(e.target.value))
    }
    
    return (
        <select onChange={onChange} className="select select-bordered w-full">
            <option value="">-- choose --</option>
            {
                options.map(option => (
                    <option key={option.key} value={option.key}>{ option.label }</option>
                ))
            }
        </select>
    )
}