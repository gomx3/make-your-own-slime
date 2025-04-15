import GradientScene from '../color/Gradient'
import { TodoProvider } from './todo/_context/TodoContext'
import TodoApp from './todo/TodoApp'

export default function TestPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* main */}
            <div className="z-10 space-y-3">
                <div className="text-3xl">background test</div>
                <TodoProvider>
                    <TodoApp />
                </TodoProvider>
            </div>

            {/* background */}
            <div className="absolute top-0 -z-99">
                <GradientScene />
            </div>
        </div>
    )
}
