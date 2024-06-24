import Image from 'next/image';
import { Box, Button, Stack } from "@mui/material";
import { useMemo } from 'react';

type ImageDisplayProps = {
    alt: string;
    image?: File | null;
    onClear?: () => void
}

const ImageDisplay = ({ alt, image, onClear }: ImageDisplayProps) => {
    const src = useMemo(() => image ? URL.createObjectURL(image) : "", [image]);
    return (image &&
        <Box sx={{ mb: 2 }}>
            <Box>
                <Image
                    key={src}
                    src={src}
                    alt={alt}
                    width={0}
                    height={0}
                    style={{
                        width: '100%',
                        height: 'auto',
                        overflow: 'hidden',
                        borderRadius: ".2rem"
                    }} />
            </Box>
            <Stack direction='row' spacing={1}>
                <Button onClick={async () => {
                    await showSaveFilePicker({ suggestedName: image.name })
                        .then(handle => handle.createWritable())
                        .then(async writable => {
                            await writable.write(image);
                            writable.close();
                        })
                        .catch(ignored => { });
                }}>
                    Save Image As
                </Button>
                {onClear &&
                    <Button onClick={onClear}>
                        Clear
                    </Button>
                }
            </Stack>
        </Box>
    )
}

export default ImageDisplay;