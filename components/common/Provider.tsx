"use client"

import { SessionProvider, SessionProviderProps } from "next-auth/react"

const Provider = ({ children, ...props }: SessionProviderProps) =>
    <SessionProvider {...props}>
        {children}
    </SessionProvider>

export default Provider;