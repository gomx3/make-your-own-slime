import { Form } from './_components/Form'
import { List } from './_components/List'
import { useTodo } from './_context/TodoContext'

export default function TodoApp() {
    const { todos, completeTodo } = useTodo()

    return (
        <section className="p-5 border border-none rounded-xl bg-gray-50 space-y-2">
            <h1 className="text-xl">📍 your todo ...</h1>
            <Form />
            <List todos={todos.filter((t) => !t.isCompleted)} onClick={completeTodo} buttonLabel="완료" />
        </section>
    )
}
