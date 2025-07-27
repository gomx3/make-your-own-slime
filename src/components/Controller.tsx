import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { colorAtom, processAtom, speedAtom, spikeAtom } from '../atoms/slider-atom'

import ControlSlider from './ControlSlider'
import ColorPalette from './ColorPicker'

const Controller = () => {
    const [speed, setSpeed] = useAtom(speedAtom)
    const [spike, setSpike] = useAtom(spikeAtom)
    const [process, setProcess] = useAtom(processAtom)
    const [color, setColor] = useAtom(colorAtom)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)

        const speed = params.get('speed')
        const spike = params.get('spike')
        const process = params.get('process')
        const color = params.get('color')

        if (speed && !isNaN(Number(speed))) setSpeed(Number(speed))
        if (spike && !isNaN(Number(spike))) setSpike(Number(spike))
        if (process && !isNaN(Number(process))) setProcess(Number(process))
        if (color) setColor(color)
    }, [setSpeed, setSpike, setProcess, setColor])

    return (
        <div className="flex flex-col xl:flex-row justify-between items-center gap-x-10 gap-y-3">
            <ColorPalette color={color} setColor={setColor} />
            <ControlSlider label="Speed" value={speed} setValue={setSpeed} min={0} max={20} step={1} />
            <ControlSlider label="Spike" value={spike} setValue={setSpike} min={0} max={5} step={0.1} />
            <ControlSlider label="Process" value={process} setValue={setProcess} min={0} max={5} step={0.5} />
        </div>
    )
}

export default Controller
