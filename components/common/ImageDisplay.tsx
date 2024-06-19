import Image from 'next/image';
import { Box, Button } from "@mui/material";
import { useMemo } from 'react';

type ImageDisplayProps = {
    alt: string;
    image?: File | null;
}

const ImageDisplay = ({ alt, image }: ImageDisplayProps) => {
    const src = useMemo(() => image ? URL.createObjectURL(image) : "", [image]);
    return (image &&
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
            <Box>
                <Box >
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
                <Button onClick={async () => {
                    await showSaveFilePicker({ suggestedName: `${alt}.png` })
                        .then(handle => handle.createWritable())
                        .then(async writable => {
                            await writable.write(image);
                            writable.close();
                        })
                        .catch(ignored => { });
                }}>
                    Save Image As
                </Button>
            </Box>
        </Box>
    )
}

export default ImageDisplay;