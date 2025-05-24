import { ChakraProvider } from '@chakra-ui/react'
import Blob from './components/Blob'
import Controller from './components/Controller'
import { system } from '@chakra-ui/react/preset'
import Footer from './components/_common/footer'

function App() {
    return (
        <ChakraProvider value={system}>
            <div className="flex flex-col min-h-screen">
                <main className="flex flex-1 flex-col justify-center items-center">
                    <h1 className="text-xl">make your own slime **</h1>
                    <Blob />
                    <Controller />
                </main>
                <Footer />
            </div>
        </ChakraProvider>
    )
}

export default App
