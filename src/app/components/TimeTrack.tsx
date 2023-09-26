'use client'

import { useEffect, useState } from "react"

export default function TimeTrack({ max, onTimesUp, position }: { max: number, onTimesUp: () => void, position: number }) {
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        setProgress(0)
    }, [position])

    useEffect(() => {
        if (progress >= max) {
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
        <div className="text-end">
            <progress className="progress progress-secondary w-full" value={progress} max={max}></progress>
            { `${(max - progress)} seconds left` }
        </div>
    )
}