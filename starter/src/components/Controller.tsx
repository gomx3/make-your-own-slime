import { useAtom } from 'jotai'
import ControlSlider from './ControlSlider'
import { processAtom, speedAtom, spikeAtom } from '../atoms/slider-atom'

const Controller = () => {
    const [speed, setSpeed] = useAtom(speedAtom)
    const [spike, setSpike] = useAtom(spikeAtom)
    const [process, setProcess] = useAtom(processAtom)

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-x-10 gap-y-3">
            <ControlSlider label="Speed" value={speed} setValue={setSpeed} min={0} max={30} step={5} />
            <ControlSlider label="Spike" value={spike} setValue={setSpike} min={0} max={5} step={0.1} />
            <ControlSlider label="Process" value={process} setValue={setProcess} min={0} max={5} step={0.5} />
        </div>
    )
}

export default Controller
