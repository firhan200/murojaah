import { useEffect, useState } from "react"
import useMurojaah from "../hooks/useMurojaah"

type QuestionOption = {
    key: number,
    label: string
}

export default function NumberOfQuestions(){
    const { listOfSurah, setTotalQuestions } = useMurojaah()
    const [options, setOptions] = useState<QuestionOption[]>([])

    useEffect(() => {
        let availableOptions: QuestionOption[] = []
        for(let i: number = 1;i <= (listOfSurah.length * 3); i++){
            availableOptions.push({
                key: i,
                label: `${i} questions`
            })
        }
        setOptions(availableOptions)
    }, [listOfSurah])

    if(listOfSurah.length < 1){
        return
    }

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTotalQuestions(parseInt(e.target.value))
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