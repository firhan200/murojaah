import useMurojaah from "../hooks/useMurojaah";
import { Question } from "../types/surah.types";
import ShowAnswerButton from "./ShowAnswerButton";

export default function QuestionCard({ question }: { question: Question }) {
    const { isShowAnswer } = useMurojaah()

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col">
                <b>Surah</b>
                {question.surah.englishName}
            </div>
            <div className="flex flex-col">
                <b>Ayah</b>
                {question.ayahNumber}
            </div>
            <div className="flex flex-col text-end">
                <b>Text</b>
                <div className="text-3xl">{question.text}</div>
            </div>
            <div className="flex flex-col text-end">
                <div className="flex justify-end items-center">
                    <ShowAnswerButton />
                    <b>Answer</b>
                </div>
                {
                    isShowAnswer ? (
                        <div className="text-3xl">{question.nextAyahText}</div>
                    ) : "..."
                }
            </div>

        </div>
    )
}