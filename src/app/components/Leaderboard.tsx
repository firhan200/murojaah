'use client'

import useMurojaah from "../hooks/useMurojaah"

export default function Leaderboard(){
    const { restart, isFinish, isStarting } = useMurojaah()

    if(!isFinish || !isStarting){
        return
    }

    return (
        <div className="mx-auto my-4 text-center">
            <h1>FINISH</h1>
            <button onClick={() => restart() } className="btn mt-4">Restart</button>
        </div>
    )
}