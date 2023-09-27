'use client'

import { useEffect, useState } from "react"
import useMurojaah from "../hooks/useMurojaah"

export default function TimeTrack({ max, onTimesUp, position }: { max: number, onTimesUp: () => void, position: number }) {
    const { showAnswer } = useMurojaah()
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        setProgress(0)
    }, [position])

    useEffect(() => {
        if (progress >= max) {
            showAnswer(true)
            setTimeout(() => {
                showAnswer(false)
                setProgress(0)
                onTimesUp()
            }, 3000)
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
        <div className="text-end">
            <progress className="progress progress-secondary w-full" value={progress} max={max}></progress>
            { `${(max - progress)} seconds left` }
        </div>
    )
}