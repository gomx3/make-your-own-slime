import { Slider } from '@chakra-ui/react'

interface ControlSliderProps {
    value: number
    setValue: (value: number) => void
    min: number
    max: number
    step?: number
}

const ControlSlider = ({ value, setValue, min, max, step = 1 }: ControlSliderProps) => {
    return (
        <div className="flex flex-row jusitfy-center items-center gap-3">
            <div className="w-3">{min}</div>
            <div className="w-10">{value}</div>
            <Slider.Root
                width="200px"
                value={[value]}
                onValueChange={(e) => setValue(e.value[0])}
                min={min}
                max={max}
                step={step}
            >
                <Slider.Control>
                    <Slider.Track>
                        <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumbs />
                </Slider.Control>
            </Slider.Root>
            <div className="w-10">{max}</div>
        </div>
    )
}

export default ControlSlider
