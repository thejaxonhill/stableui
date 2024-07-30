"use client"
import { Box, Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import validator from 'email-validator';
import { signIn } from "next-auth/react";
import { useState } from "react";

const ContinueWithEmailForm = () => {
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);

    return (
        <Stack direction='column' spacing={2}>
            <Box>
                <Typography sx={{ color: 'white' }} >Email:</Typography>
                <TextField
                    fullWidth
                    size="small"
                    placeholder='username@example.com'
                    error={!validEmail}
                    value={email}
                    helperText={email && !validEmail ? 'Please enter a valid email.' : undefined}
                    onChange={e => setEmail(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                        },
                    }}
                />
            </Box>
            <Button
                onClick={() => {
                    if (!validator.validate(email))
                        setValidEmail(false);
                    else
                        signIn("resend", { email, callbackUrl: '/' })
                }}
                disabled={!email}
                sx={{
                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? 'inherit' : '#cac9fa'
                    },
                    backgroundColor: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                    height: 40,
                    textTransform: 'none',
                    border: theme.palette.mode === 'dark' ? 1 : 0
                }}>
                Continue with email
            </Button>
        </Stack>
    )
}

export default ContinueWithEmailForm;