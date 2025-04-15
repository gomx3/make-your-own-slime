export const List = ({ todos, onClick, buttonLabel }) => {
    return (
        <div className="space-y-2">
            {todos
                .filter((t) => t.isCompleted !== true)
                .map((t) => (
                    <div key={t.id} className="flex justify-between space-x-2">
                        <div>{t.todo}</div>
                        <button
                            onClick={() => onClick(t.id)}
                            className="px-1 border border-gray-400 rounded-lg transition-colors hover:bg-gray-200"
                        >
                            {buttonLabel}
                        </button>
                    </div>
                ))}
        </div>
    )
}
