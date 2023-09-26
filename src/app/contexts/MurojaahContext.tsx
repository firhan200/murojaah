import { createContext, useState } from "react";
import { Ayah, GetAyahResponse, Question, Surah } from "../types/surah.types";

export type MurojaahContextState = {
    isFinish: boolean,
    isStarting: boolean,
    start: () => void,
    stop: () => void,
    listOfSurah: Surah[],
    interval: number | null,
    addSurah: (surah: Surah) => void,
    removeSurah: (surahNumber: number) => void,
    selectInterval: (surahNumber: number) => void,
    questions: Question[],
    generateQuestions: () => void,
    finish: () => void,
    restart: () => void,
    reset: () => void
}

export const MurojaahContext = createContext<MurojaahContextState | null>(null)

export const MurojaahProvider = ({children} : {children: React.ReactNode}) => {
    const [isFinish, setIsFinish] = useState<boolean>(false)
    const [questions, setQuestions] = useState<Question[]>([])
    const [isStarting, setIsStarting] = useState<boolean>(false)
    const [listOfSurah, setListOfSurah] = useState<Surah[]>([])
    const [interval, setInterval] = useState<number | null>(null)

    const finish = () => {
        setIsFinish(true)
    }

    const reset = () => {
        setIsFinish(false)
        setIsStarting(false)
        setQuestions([])
        setListOfSurah([])
        setInterval(null)
    }

    const restart = async () => {
        await generateQuestions()
        setIsFinish(false)
        setIsStarting(true)
    }

    const start = () => {
        setIsFinish(false)
        setIsStarting(true)
    }

    const stop = () => {
        setIsStarting(false)
    }

    const addSurah = (surah: Surah) => {
        setListOfSurah(state => [...state, surah])
    }

    const removeSurah = (surahNumber: number) => {
        const newListOfSurah = listOfSurah.filter(s => s.number !== surahNumber)
        setListOfSurah(newListOfSurah)
    }

    const selectInterval = (second: number) => {
        setInterval(second)
    }

    function generateRandomInteger(min: number, max: number) {
        return Math.floor(min + Math.random()*(max - min + 1))
    }

    const getTextFromSurahAndAyah = async (surahNumber: number, ayah: number): Promise<Ayah | null> => {
        const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayah}/editions/quran-uthmani,en.asad,en.pickthall`)
        const body = await res.json() as GetAyahResponse

        if(body.code !== 200){
            return null
        }

        return body.data[0] as Ayah
    }

    const generateQuestions = async () => {
        const questions: Question[] = listOfSurah.map((s: Surah) => {
            return {
                surah: s,
                ayahNumber: generateRandomInteger(1, s.numberOfAyahs)
            }
        })

        const getAyah: Promise<Ayah | null>[] = []
        questions.map(q => {
            getAyah.push(getTextFromSurahAndAyah(q.surah.number, q.ayahNumber))
        })

        const results = await Promise.all(getAyah)
        console.log(results)
        results.map(result => {
            questions.map(q => {
                if(q.surah.number === result?.surah.number){
                    q.text = result.text
                }
            })
        })

        setQuestions(questions)
    }

    return (
        <MurojaahContext.Provider value={{
            isStarting,
            start,
            stop,
            listOfSurah,
            interval,
            addSurah,
            removeSurah,
            selectInterval,
            questions,
            generateQuestions,
            isFinish,
            finish,
            restart,
            reset
        }}>
            { children }
        </MurojaahContext.Provider>
    )
}