'use client'

import { useEffect, useState } from "react"

export default function TimeTrack({ max, onTimesUp }: { max: number, onTimesUp: () => void }){
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        if(progress >= max){
            onTimesUp()
            setProgress(0)
            return
        }

        const timer = setTimeout(() => {
            setProgress(progress + 1)
        }, 1000)

        return () => {
            clearTimeout(timer) 
        }
    }, [max, progress, setProgress])

    return (
        <progress className="progress progress-secondary w-full" value={progress} max={max}></progress>
    )
}