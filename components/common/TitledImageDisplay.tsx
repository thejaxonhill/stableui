import { Box, Typography } from "@mui/material";
import ImageDisplay, { ImageDisplayProps } from "./ImageDisplay"

type TitledImageDisplayProps = ImageDisplayProps & {
    title?: string;
}

const TitledImageDisplay = ({ title, image, ...props }: TitledImageDisplayProps) => image &&
    <Box>
        <Typography>{title}</Typography>
        <ImageDisplay maxWidth={400} image={image} {...props} />
    </Box>

export default TitledImageDisplay;