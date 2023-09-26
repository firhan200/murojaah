'use client'

import useMurojaah from "../hooks/useMurojaah";
import { Surah } from "../types/surah.types"
import Multiselect from 'multiselect-react-dropdown';

type SurahSelectionProps = {
    surahs: Surah[]
}

type SurahOption = {
    id: number,
    name: string
}

export default function SurahSelection({ surahs }: SurahSelectionProps){
    const { addSurah, removeSurah } = useMurojaah()

    const options: SurahOption[] = surahs.map(surah => {
        return {
            id: surah.number,
            name: `${surah.number}:${surah.englishName}`,
        }
    })

    const getSurahByNumber = (surahNumber: number) => {
        return surahs.find(s => s.number === surahNumber)
    }

    const onSelect = (selectedList: any, selectedItem: SurahOption) => {
        const foundSurah = getSurahByNumber(selectedItem.id)
        if(typeof foundSurah === "undefined"){
            return
        }

        addSurah(foundSurah)
    }

    const onRemove = (selectedList: any, selectedItem: SurahOption) => {
        removeSurah(selectedItem.id)
    }

    return (
        <Multiselect
            className="select-bordered h-auto"
            options={options} // Options to display in the dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
        />
    )
}