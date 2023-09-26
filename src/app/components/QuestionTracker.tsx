export default function QuestionTracker({ current, total }: { current: number, total: number }){
    return (
        <div className="text-center">
            <ul className="menu menu-horizontal bg-base-200 rounded-box gap-4">
                <li>question no. { current }</li>
                <li>/</li>
                <li>{ total }</li>
            </ul>
        </div>
    )
}