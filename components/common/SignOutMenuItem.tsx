"use client"

import { MenuItem, MenuItemProps } from "@mui/material";
import { signOut } from "next-auth/react";

const SignOutMenuItem = ({ children, ...props }: Omit<MenuItemProps, 'onClick'>) =>
    <MenuItem onClick={() => signOut()} {...props}>
        {children}
    </MenuItem>

export default SignOutMenuItem;