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
    const { isStarting ,start, listOfSurah, interval, generateQuestions } = useMurojaah()
    const [loading, setLoading] = useState<boolean>(false)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()

        //validating
        if(listOfSurah.length < 1){
            alert("please select at least 1 Surah")
            return
        }

        if(interval === null){
            alert("please select interval")
            return
        }
        
        setLoading(true)
        await generateQuestions()
        setLoading(false)

        start()
    }

    if(isStarting){
        return
    }

    if(loading){
        return <div className="text-center my-20 w-full">
            <div>Generating Questions...</div>
            <div className="loading loading-dots loading-lg"></div>
        </div>
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