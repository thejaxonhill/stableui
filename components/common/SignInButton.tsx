"use client"

import { Button, ButtonProps } from "@mui/material"
import { signIn } from "next-auth/react";

const SignInButton = (props: Omit<ButtonProps, 'onClick'>) =>
    <Button onClick={() => signIn()} {...props}>
        Sign in
    </Button>

export default SignInButton;