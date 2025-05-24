import { Slider } from '@chakra-ui/react'

// interface ControlSliderProps {
//     value: number
//     onChange: (value: number) => void
//     min: number
//     max: number
//     step: number
// }
// const ControlSlider = ({ value, onChange, min, max, step }: ControlSliderProps) => {
const ControlSlider = () => {
    return (
        <div>
            <div>min</div>
            <Slider.Root>
                <Slider.Control>
                    <Slider.Track>
                        <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumbs />
                </Slider.Control>
            </Slider.Root>
            <div>max</div>
        </div>
    )
}

export default ControlSlider
