"use client"

import { Box, Dialog, DialogContent, DialogContentText, Stack, TextField } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "../../ts/nextjs/navigation"
import SubmitButton from "./SubmitButton"

type ApiKeyProviderProps = {
    hasKey?: boolean;
}

const ApiKeyDialog = ({ hasKey }: ApiKeyProviderProps) => {
    const router = useRouter();
    const pathname = router.pathname;
    const [helperText, setHelperText] = useState<string | null>(null);

    const handleSetApiKey = async (key: string) => {
        setHelperText(null);
        await fetch('/api/auth/key', {
            method: 'post',
            headers: {
                'Authorization': key
            }
        })
            .then(async res => {
                if (res.ok)
                    router.refresh();
                else
                    setHelperText((await res.json()).message)
            })
    }

    return (
        <Dialog open={!hasKey
            && (pathname.includes('control')
                || pathname.includes('edit')
                || pathname.includes('generate')
                || pathname.includes('upscale'))}
            maxWidth="sm"
            fullWidth>
            <DialogContent>
                <DialogContentText sx={{ mb: 1 }}>
                    Please enter your api key:
                </DialogContentText>
                <form action={formData => handleSetApiKey(formData.get('apiKey') as string)}>
                    <Stack
                        spacing={{ xs: 2, sm: 1 }}
                        direction={{ xs: 'column', sm: 'row' }}
                        flexWrap="wrap"
                        useFlexGap>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <TextField
                                name='apiKey'
                                helperText={helperText}
                                error={!!helperText}
                                size="small"
                                fullWidth
                                label='Stability API Key'
                                type="password" />
                        </Box>
                        <SubmitButton variant="contained">
                            Authorize
                        </SubmitButton>

                    </Stack>
                </form>
                <DialogContentText sx={{ mt: 1 }}>
                    You can access yours {
                        <Link href={'https://platform.stability.ai/account/keys'} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                            here
                        </Link>}.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default ApiKeyDialog;