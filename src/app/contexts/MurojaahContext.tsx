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
    reset: () => void,
    totalQuestions: number | null,
    setTotalQuestions: (total: number) => void,
    juz: number | "",
    setJuz: (juz: number | "") => void,
    resetListOfSurah: () => void
}

export const MurojaahContext = createContext<MurojaahContextState | null>(null)

export const MurojaahProvider = ({children} : {children: React.ReactNode}) => {
    const [isFinish, setIsFinish] = useState<boolean>(false)
    const [questions, setQuestions] = useState<Question[]>([])
    const [isStarting, setIsStarting] = useState<boolean>(false)
    const [listOfSurah, setListOfSurah] = useState<Surah[]>([])
    const [interval, setInterval] = useState<number | null>(null)
    const [totalQuestions, _setTotalQuestion] = useState<number | null>(null)
    const [juz, _setJuz] = useState<number | "">("")

    const setJuz = (juz: number | "") => {
        _setJuz(juz)
    }
    
    const setTotalQuestions = (total: number) => {
        _setTotalQuestion(total)
    }

    const finish = () => {
        setIsFinish(true)
    }

    const resetListOfSurah = () => {
        setListOfSurah([])
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
        if(totalQuestions === null){
            return
        }

        //surah:ayah
        let questionsTmp: string[] = []

        //loop total questions
        const questions: Question[] = [...Array(totalQuestions)].map((val, index) => {
            //get random questions on list of surah range [1,2,3,4,5]
            let randomSurah = listOfSurah[generateRandomInteger(0, (listOfSurah.length - 1))]
            let randomAyahOnSurah = generateRandomInteger(1, randomSurah.numberOfAyahs)
            let isEnough = false
            const maxLoop = 10
            let counter = 0
            while(isEnough){
                if(counter >= maxLoop){
                    isEnough = false
                    break
                }

                const key: string = `${randomSurah}:${randomAyahOnSurah}`
                const isAleadyInArr: string | undefined = questionsTmp.find(keyData => keyData == key)
                if(typeof isAleadyInArr === "undefined"){
                    questionsTmp.push(key)
                    continue
                }

                counter++
                randomSurah = listOfSurah[generateRandomInteger(0, (listOfSurah.length - 1))]
                randomAyahOnSurah = generateRandomInteger(1, randomSurah.numberOfAyahs)
            }

            //generate random ayah based on surah
            return {
                surah: randomSurah,
                ayahNumber: randomAyahOnSurah
            }
        })

        const getAyah: Promise<Ayah | null>[] = []
        questions.map(q => {
            getAyah.push(getTextFromSurahAndAyah(q.surah.number, q.ayahNumber))
        })

        const results = await Promise.all(getAyah)
        results.map(result => {
            questions.map(q => {
                if(q.surah.number === result?.surah.number && q.ayahNumber === result?.numberInSurah){
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
            reset,
            totalQuestions,
            setTotalQuestions,
            juz,
            setJuz,
            resetListOfSurah
        }}>
            { children }
        </MurojaahContext.Provider>
    )
}