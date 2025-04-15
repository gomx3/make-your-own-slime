import { createContext, useContext, useState } from 'react'

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([])

    const addTodo = (text) => {
        const newTodo = {
            id: new Date().getTime(),
            todo: text.trim(),
            isCompleted: false,
        }
        setTodos((prev) => [...prev, newTodo])
    }

    const completeTodo = (id) => {
        setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, isCompleted: true } : todo)))
    }

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }

    return <TodoContext.Provider value={{ todos, addTodo, completeTodo, deleteTodo }}>{children}</TodoContext.Provider>
}

export const useTodo = () => {
    const context = useContext(TodoContext)

    if (!context) {
        throw new Error('useTodo를 사용하기 위해서, 무조건 TodoProvider로 감싸야 합니다.')
    }

    return context
}
