import { ColorPicker, HStack, Portal, parseColor } from '@chakra-ui/react'

interface ColorPaletteProps {
    color?: string
    setColor: (value: string) => void
}

const ColorPalette = ({ color = '#707070', setColor }: ColorPaletteProps) => {
    return (
        <ColorPicker.Root value={parseColor(color)} width="250px" onValueChange={(e) => setColor(e.valueAsString)}>
            <ColorPicker.HiddenInput />
            <ColorPicker.Label>Color</ColorPicker.Label>
            <ColorPicker.Control>
                <ColorPicker.Input />
                <ColorPicker.Trigger />
            </ColorPicker.Control>
            <Portal>
                <ColorPicker.Positioner>
                    <ColorPicker.Content>
                        <ColorPicker.Area />
                        <HStack>
                            <ColorPicker.EyeDropper size="xs" variant="outline" />
                            <ColorPicker.Sliders />
                        </HStack>
                    </ColorPicker.Content>
                </ColorPicker.Positioner>
            </Portal>
        </ColorPicker.Root>
    )
}

export default ColorPalette
