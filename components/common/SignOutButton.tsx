'use client'

import { Button, ButtonProps } from "@mui/material";
import { signOut } from "next-auth/react";

const SignOutButton = (props: Omit<ButtonProps, 'onClick'>) =>
    <Button onClick={() => signOut()} {...props}>
        Sign out
    </Button>

export default SignOutButton;