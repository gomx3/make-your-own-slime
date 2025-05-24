import { useAtom } from 'jotai'
import ControlSlider from './ControlSlider'
import { processAtom, speedAtom, spikeAtom } from '../atoms/slider-atom'

const Controller = () => {
    const [speed, setSpeed] = useAtom(speedAtom)
    const [spike, setSpike] = useAtom(spikeAtom)
    const [process, setProcess] = useAtom(processAtom)

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-x-10 gap-y-3">
            <div>
                <label>Speed</label>
                <ControlSlider value={speed} setValue={setSpeed} min={0} max={30} step={5} />
            </div>

            <div>
                <label>Spike</label>
                <ControlSlider value={spike} setValue={setSpike} min={0} max={5} step={0.1} />
            </div>

            <div>
                <label>Process</label>
                <ControlSlider value={process} setValue={setProcess} min={0} max={5} step={0.5} />
            </div>
        </div>
    )
}

export default Controller
