import { ChakraProvider } from '@chakra-ui/react'
import Blob from './components/Blob'
import Controller from './components/Controller'
import { system } from '@chakra-ui/react/preset'
import Footer from './components/_common/footer'

function App() {
    return (
        <ChakraProvider value={system}>
            <main className="flex flex-col justify-center items-center">
                <h1 className="text-xl">make your own slime **</h1>
                <Blob />
                <Controller />
            </main>
            <Footer />
        </ChakraProvider>
    )
}

export default App
