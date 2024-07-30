import { Box, Paper, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import stableuiLogo from "../../public/static/images/icon.png";
import { roboto } from "../layout";

export const metadata: Metadata = {
    title: 'Stable UI - Login'
}

const VerifyRequest = async () => {
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
                <Stack
                    direction='column'
                    spacing={2}
                    sx={{
                        mx: 'auto',
                        maxWidth: 264,
                        textAlign: 'center'
                    }}>
                    <Image
                        alt='StableUI Logo'
                        src={stableuiLogo}
                        height={200}
                        width={200}
                        style={{ margin: 'auto' }} />
                    {/* <Box sx={{ maxWidth: 264, textAlign: 'center' }}> */}
                    <Typography variant="h4">
                        Check your email
                    </Typography>
                    <Typography sx={{ textAlign: 'center', textWrap: 'wrap' }}>
                        A sign in link has been sent to your email address.
                    </Typography>
                    <Link href={'/'} style={{ color: 'inherit' }}>
                        <Typography
                            sx={{
                                color: 'inherit',
                                display: 'flex',
                                justifyContent: 'center',
                                '&:hover': {
                                    color: '#cac9fa',
                                    transition: '.4s'
                                }
                            }}>
                            Return to Stable UI home
                        </Typography>
                    </Link>
                    {/* </Box> */}
                </Stack>
            </Paper>
        </Box>
    )
}

export default VerifyRequest;