import { ChakraProvider } from '@chakra-ui/react'
import Blob from './components/Blob'
import Controller from './components/Controller'
import { system } from '@chakra-ui/react/preset'

function App() {
    return (
        <ChakraProvider value={system}>
            <p className="text-red-500">test</p>
            <div className="text-yellow-500">test2</div>

            <Blob />
            <Controller />
        </ChakraProvider>
    )
}

export default App
