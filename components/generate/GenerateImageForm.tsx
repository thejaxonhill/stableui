"use client"

import { Box, TextField } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { generateImageSD3 } from '../../ts/client/generate-image';
import { ImageDisplay } from '../common';

const GenerateImageForm = () => {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        const image = await generateImageSD3({ prompt: prompt });
        if (image) setImage(image);
        setLoading(false);
    }

    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                <TextField
                    onChange={e => setPrompt(e.target.value)}
                    fullWidth
                    label="Prompt"
                    required
                    value={prompt}
                    sx={{ mr: 1 }} />
                <LoadingButton
                    onClick={handleGenerate}
                    loading={loading}
                    variant="contained" >
                    Send
                </LoadingButton>
            </Box>
            <ImageDisplay alt={prompt} image={image} />
        </Box>
    )
}

export default GenerateImageForm;