import { Question } from "../types/surah.types";

export default function QuestionCard({ question }: {question: Question}){
    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col">
                <b>Surah</b>
                { question.surah.englishName }
            </div>
            <div className="flex flex-col">
                <b>Ayah</b>
                { question.ayahNumber }
            </div>
            <div className="flex flex-col">
                <b>Text</b>
                <div className="text-2xl">{ question.text }</div>
            </div>
        </div>
    )
}