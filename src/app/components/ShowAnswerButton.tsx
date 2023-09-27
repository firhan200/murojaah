import useMurojaah from "../hooks/useMurojaah";

export default function ShowAnswerButton() {
    const { isShowAnswer, showAnswer } = useMurojaah()

    return (
        <div className="flex align-items-center">
            <label className="label cursor-pointer">
                <span className="label-text text-sm mr-2">Show?</span>
                <input type="checkbox" className="toggle toggle-sm" onChange={e => showAnswer(e.target.checked)} checked={isShowAnswer} />
            </label>
        </div>
    )
}