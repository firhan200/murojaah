'use client'

import { useEffect, useState } from "react"
import useMurojaah from "../hooks/useMurojaah"
import QuestionCard from "./QuestionCard"
import TimeTrack from "./TimeTrack"
import QuestionTracker from "./QuestionTracker"

export default function MurojaahGenerator(){
    const { isStarting, questions, interval, isFinish, finish } = useMurojaah()
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const [resetTime, setResetTime] = useState<number>(0);

    if(!isStarting || interval === null || isFinish){
        return
    }

    const renderQuestion = () => {
        const currentQuestion = questions[currentPosition]

        return currentQuestion;
    }

    const finishMurojaah = () => {
        setCurrentPosition(0)
        finish()
    }

    const next = () => {
        if(currentPosition >= (questions.length - 1)){
            finishMurojaah()
            return
        }


        setCurrentPosition(currentPosition + 1)
    }

    const NextButton = () => {
        if(currentPosition >= (questions.length - 1)){
            return
        }

        return <button onClick={() => next()} className="btn">Next</button>
    }

    const ExitButton = () => {
        return <button onClick={() => finishMurojaah()} className="btn btn-error">Exit</button>
    }

    const onTimesUp = () => {
        next()
    }

    return (
        <>
            <TimeTrack position={currentPosition} onTimesUp={() => onTimesUp()} max={interval}/>
            <QuestionTracker current={(currentPosition + 1)} total={questions.length}/>
            <QuestionCard question={renderQuestion()}/>
            <div className="p-4 flex justify-between">
                <ExitButton />
                <NextButton />
            </div>
        </>
    )
}