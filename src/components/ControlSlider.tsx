import { Box, Slider, Text } from '@chakra-ui/react'

interface ControlSliderProps {
    label: string
    value: number
    setValue: (value: number) => void
    min: number
    max: number
    step?: number
}

const ControlSlider = ({ label, value, setValue, min, max, step = 1 }: ControlSliderProps) => {
    return (
        <Slider.Root
            width="250px"
            value={[value]}
            onValueChange={(e) => setValue(e.value[0])}
            min={min}
            max={max}
            step={step}
        >
            <Box className="flex flex-row justify-between">
                <Slider.Label>{label}</Slider.Label>
                <Text>{value}</Text>
            </Box>

            <Box className="flex flex-row jusitfy-center items-center gap-5">
                <Text>{min}</Text>
                <Slider.Control>
                    <Slider.Track>
                        <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumbs />
                </Slider.Control>
                <Text>{max}</Text>
            </Box>
        </Slider.Root>
    )
}

export default ControlSlider
