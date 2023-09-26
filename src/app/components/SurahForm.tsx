'use client'

import { FormEventHandler, useState } from "react";
import { Surah } from "../types/surah.types";
import IntervalSelection from "./IntervalSelection";
import SurahSelection from "./SurahSelection";
import { MurojaahProvider } from "../contexts/MurojaahContext";
import useMurojaah from "../hooks/useMurojaah";

type SurahFormProps = {
    surahs: Surah[]
}

export default function SurahForm({ surahs } : SurahFormProps){
    const { isStarting ,start, generateQuestions } = useMurojaah()
    const [loading, setLoading] = useState<boolean>(false)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        setLoading(true)
        await generateQuestions()
        setLoading(false)

        start()
    }

    if(isStarting){
        return
    }

    if(loading){
        return <span className="loading loading-dots loading-lg"></span>
    }

    return (
        <form onSubmit={submit} method="post" className="p-4 flex flex-col gap-4">
			<div className="form-group">
				<label>Select Surah</label>
				<SurahSelection surahs={surahs}/>
			</div>
			<div className="form-group">
				<label>Select Interval</label>
				<IntervalSelection />
			</div>
			<button className="btn">Start Murojaah</button>
		</form>
    )
}