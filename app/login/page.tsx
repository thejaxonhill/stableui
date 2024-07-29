import { Box, Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { Metadata } from "next";
import Image from "next/image";
import ProviderSignInButton from "../../components/login/ProviderSignInButton";
import stableuiLogo from "../../public/static/images/icon.png";
import discordLogo from "../../public/static/images/providers/discord-mark-blue.png";
import googleLogo from "../../public/static/images/providers/google-logo.png";
import { roboto } from "../layout";
import ContinueWithEmailForm from "../../components/login/ContinueWithEmailForm";

export const metadata: Metadata = {
    title: 'Stable UI - Login'
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
            <Paper sx={{ p: 5, color: '#fff' }}>
                <Stack direction='column' spacing={2} sx={{ mx: 'auto' }}>
                    <Image
                        alt='StableUI Logo'
                        src={stableuiLogo}
                        height={200}
                        width={200}
                        style={{ margin: 'auto' }} />
                    <Typography sx={{ textAlign: 'center' }}>Log in to Stable UI to use platform</Typography>
                    <Stack direction='column' spacing={2} >
                        {providers.map(provider => <ProviderSignInButton {...provider} />)}
                        <Divider>or</Divider>
                        <ContinueWithEmailForm />
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )
}

export default Login;