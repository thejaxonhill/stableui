"use client"

import { Alert } from "@mui/material"
import { signIn } from "next-auth/react"
import { useEffect } from "react"

const UnauthenticatedRedirector = () => {
    useEffect(() => {
        signIn();
    }, [])
    return (
        <Alert severity="info">
            Redirecting to login
        </Alert>
    )
}