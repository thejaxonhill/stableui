import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Image from "next/image";
import ContinueWithEmailForm from "../../components/login/ContinueWithEmailForm";
import ProviderSignInButton from "../../components/login/ProviderSignInButton";
import stableuiLogo from "../../public/static/images/icon.png";
import discordLogo from "../../public/static/images/providers/discord-mark-blue.png";
import googleLogo from "../../public/static/images/providers/google-logo.png";
import { roboto } from "../layout";
import { ThemedPaper } from "../../components/common";

export const metadata: Metadata = {
    title: 'Stable UI - Login',
    description: `Log in to Stable UI to begin generating images with Stable Diffusion 3 using Stability AI's v2beta REST API.`
}

const providers = [
    {
        id: 'google',
        name: 'Google',
        iconHref: googleLogo
    },
    {
        id: 'discord',
        name: 'Discord',
        iconHref: discordLogo
    }
]

const Login = async () => {
    return (
        <Box
            className={roboto.className}
            sx={{
                display: 'flex',
                minHeight: '80vh',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <ThemedPaper
                light={{ backgroundColor: '#6366F1' }}
                sx={{ p: 5, color: '#fff' }}>
                <Stack direction='column' spacing={2} sx={{ mx: 'auto' }}>
                    <Image
                        alt='StableUI Logo'
                        src={stableuiLogo}
                        height={200}
                        width={200}
                        style={{ margin: 'auto' }} />
                    <Typography sx={{ textAlign: 'center' }}>Log in to Stable UI to start prompting</Typography>
                    <Stack direction='column' spacing={2} >
                        {providers.map(provider => <ProviderSignInButton key={provider.id} {...provider} />)}
                        <Divider>or</Divider>
                        <ContinueWithEmailForm />
                    </Stack>
                </Stack>
            </ThemedPaper>
        </Box>
    )
}

export default Login;