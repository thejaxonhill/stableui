"use client"

import Image from "next/image"
import { Button, useTheme } from "@mui/material"
import { signIn } from "next-auth/react"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

type ProviderSignInButtonProps = {
    key?: string;
    id: string,
    name: string,
    iconHref: StaticImport
}

const ProviderSignInButton = ({ key, id, name, iconHref }: ProviderSignInButtonProps) => {
    const theme = useTheme();
    return (
        <Button
            key={key}
            onClick={() => signIn(id)}
            size="large"
            startIcon={
                <Image
                    alt='Provider logo'
                    src={iconHref}
                    width={20}
                    height={0} style={{ height: 'auto' }} />
            }
            sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                backgroundColor: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                height: 40,
                '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? 'inherit' : '#cac9fa'
                },
                minWidth: 250,
                textTransform: 'none',
                border: theme.palette.mode === 'dark' ? 1 : 0
            }}>
            Sign in with {name}
        </Button>
    )
}


export default ProviderSignInButton;