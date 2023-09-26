'use client'

import { useEffect, useState } from "react";
import useMurojaah from "../hooks/useMurojaah";
import { Surah } from "../types/surah.types"
import Multiselect from 'multiselect-react-dropdown';
import { GetJuzResponse, Juz } from "../types/juz.types";

type SurahSelectionProps = {
    surahs: Surah[]
}

type SurahOption = {
    id: number,
    name: string
}

export default function SurahSelection({ surahs }: SurahSelectionProps){
    const { addSurah, removeSurah, juz, resetListOfSurah } = useMurojaah()
    const [selectedValue, setSelectedValue] = useState<SurahOption[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if(juz === ""){
            return
        }

        async function getSurahInJuz(){
            setLoading(true)

            const res = await fetch(`http://api.alquran.cloud/v1/juz/${juz}/en.asad`)
            const data = await res.json() as GetJuzResponse

            if(data.code !== 200){
                return
            }

            //reset list of surah
            resetListOfSurah()

            let newSelectedValues: SurahOption[] = []
            for(const key in data.data.surahs){
                const surah: Juz = data.data.surahs[key]
                newSelectedValues.push({
                    id: surah.number,
                    name: `${surah.number}:${surah.englishName}`,
                })
                
                selectSurah(surah.number)
            }

            setSelectedValue(newSelectedValues)

            setLoading(false)
        }

        getSurahInJuz()
    }, [juz])

    const options: SurahOption[] = surahs.map(surah => {
        return {
            id: surah.number,
            name: `${surah.number}:${surah.englishName}`,
        }
    })

    const getSurahByNumber = (surahNumber: number) => {
        return surahs.find(s => s.number === surahNumber)
    }

    const selectSurah = (surahNumber: number) => {
        const foundSurah = getSurahByNumber(surahNumber)
        if(typeof foundSurah === "undefined"){
            return
        }

        addSurah(foundSurah)
    }

    const onSelect = (selectedList: any, selectedItem: SurahOption) => {
        selectSurah(selectedItem.id)
    }

    const onRemove = (selectedList: any, selectedItem: SurahOption) => {
        removeSurah(selectedItem.id)
    }

    if(loading) {
        return <div className="loading loading-dots loading-xs"></div>
    }

    return (
        <Multiselect
            className="select-bordered h-auto"
            selectedValues={selectedValue}
            options={options} // Options to display in the dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            placeholder="-- type to choose --"
        />
    )
}