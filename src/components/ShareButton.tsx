import { useAtomValue } from 'jotai'
import { colorAtom, processAtom, speedAtom, spikeAtom } from '../atoms/slider-atom'
import { Button } from '@chakra-ui/react'

export default function ShareButton({ handleToast }: { handleToast: () => void }) {
    const speedValue = useAtomValue(speedAtom)
    const spikeValue = useAtomValue(spikeAtom)
    const processValue = useAtomValue(processAtom)
    const colorValue = useAtomValue(colorAtom)

    const handleShare = () => {
        const params = new URLSearchParams()
        params.set('speed', String(speedValue))
        params.set('spike', String(spikeValue))
        params.set('process', String(processValue))
        params.set('color', colorValue)

        const shareableLink = `${window.location.origin}/share?${params.toString()}`

        navigator.clipboard.writeText(shareableLink).then(() => {
            handleToast()
        })
    }

    return (
        <Button size="sm" rounded="lg" onClick={handleShare} mt={4}>
            Click and Share
        </Button>
    )
}
