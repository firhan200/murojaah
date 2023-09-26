'use client'

import { useState } from "react"
import useMurojaah from "../hooks/useMurojaah"

export default function Leaderboard(){
    const { restart, reset, isFinish, isStarting } = useMurojaah()
    const [loading, setLoading] = useState<boolean>(false)

    const restartQuestions = async () => {
        setLoading(true)
        await restart()
        setLoading(false)
    }

    if(!isFinish || !isStarting){
        return
    }

    if(loading){
        return <div className="text-center my-20 w-full">
            <div>Generating Questions...</div>
            <div className="loading loading-dots loading-lg"></div>
        </div>
    }

    return (
        <div className="mx-auto my-4 text-center flex flex-col">
            <h1>Finish</h1>
            <button onClick={() => restartQuestions() } className="btn mt-4">Restart</button>
            <div className="divider">OR</div>
            <button onClick={() => reset() } className="btn mt-4">Reset</button>
        </div>
    )
}