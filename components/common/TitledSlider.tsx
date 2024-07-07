import { Box, Slider, SliderProps, Typography } from "@mui/material"
import { ReactNode } from "react"

type TitledSliderProps = SliderProps & {
    title?: ReactNode
}

const TitledSlider = ({ title, sx, ...props }: TitledSliderProps) =>
    <Box>
        <Typography variant='body2'>{title}</Typography>
        <Slider
            size='small'
            sx={{ minWidth: 200, maxWidth: 400, ...sx }}
            {...props} />
    </Box>

export default TitledSlider;