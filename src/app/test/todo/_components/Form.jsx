import { useState } from 'react'
import { useTodo } from '../_context/TodoContext'

export const Form = () => {
    const [input, setInput] = useState('')

    const { addTodo } = useTodo()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!input.trim()) return

        addTodo(input)
        setInput('')
    }

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="할 일을 입력하세요"
                className="flex-1 p-1 border border-gray-300 rounded-lg"
            />
            <button
                type="submit"
                className="px-3 border border-none rounded-lg bg-pink-100 transition-transform duration-300 hover:translate-y-1"
            >
                추가
            </button>
        </form>
    )
}
