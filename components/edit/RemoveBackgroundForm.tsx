"use client"

import { Stack, Tooltip } from "@mui/material";
import { useState } from "react";
import { removeBackground, RemoveBackgroundParams } from "../../ts/client/edit";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { ImageDisplay, ImageInput, OutputFormatSelect, SubmitButton, TitledImageDisplay } from "../common";

const RemoveBackgroundForm = () => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [params, setParams] = useState<RemoveBackgroundParams>({
        outputFormat: OutputFormat.PNG
    });

    const send = async () => {
        const image = await removeBackground(params);
        if (image instanceof File)
            setImage(image);
        else if (image)
            router.set('error', image);
    }

    return (
        <form action={send}>
            <Stack
                spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 2 }}>
                <ImageInput
                    key={params.image?.name}
                    onChange={file => setParams({ ...params, image: file })}>
                    Upload image *
                </ImageInput>
                <OutputFormatSelect
                    value={params.outputFormat}
                    onChange={outputFormat => setParams({ ...params, outputFormat: outputFormat as OutputFormat })} />
                <Tooltip title={!params.image && 'Image required for erase'} >
                    <span>
                        <SubmitButton
                            disabled={!params.image}
                            variant="contained"
                            sx={{ height: '100%', width: '100%' }}>
                            Send
                        </SubmitButton>
                    </span>
                </Tooltip>
            </Stack>
            <TitledImageDisplay
                alt={"Reference Image"}
                title="Reference image:"
                image={params.image}
                onClear={() => setParams({ ...params, image: undefined })} />
            <ImageDisplay alt={image?.name ?? 'Response Image'} image={image} onClear={() => setImage(null)} showSave />
        </form >
    )
}

export default RemoveBackgroundForm;