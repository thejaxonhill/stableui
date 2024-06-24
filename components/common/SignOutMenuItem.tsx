"use client"

import { MenuItem, MenuItemProps } from "@mui/material";
import { signOut } from "next-auth/react";

const SignOutMenuItem = ({ children, ...props }: Omit<MenuItemProps, 'onClick'>) =>
    <MenuItem onClick={async () => {
        await fetch('/api/auth/key', { method: 'delete' })
        signOut({ callbackUrl: '/', redirect: true });
    }} {...props}>
        {children}
    </MenuItem>

export default SignOutMenuItem;