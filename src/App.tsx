import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@chakra-ui/react/preset'

import Blob from './components/Blob'
import Controller from './components/Controller'
import Footer from './components/_common/footer'
import ShareButton from './components/ShareButton'
import ClipboardToast from './components/ClipboardToast'

function App() {
    const [openToast, setOpenToast] = useState(false)

    const handleToast = () => setOpenToast(!openToast)

    return (
        <ChakraProvider value={system}>
            <main className="flex flex-col justify-center items-center">
                <h1 className="text-xl mb-3">make your own slime **</h1>
                <ShareButton handleToast={handleToast} />

                <Blob />
                <Controller />

                {openToast && <ClipboardToast handleToast={handleToast} />}
            </main>
            <Footer />
        </ChakraProvider>
    )
}

export default App
