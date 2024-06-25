"use client"

import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { SignOutMenuItem } from "../common";
import { Session } from "next-auth";
import { useState } from "react";
import Link from "next/link";

type AvatarMenuProps = {
    session: Session
}

const AvatarMenu = ({ session }: AvatarMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    return (
        <>
            <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                <Avatar
                    src={session.user?.image ?? undefined}
                    alt={session.user?.name!} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                open={Boolean(anchorEl)}>
                <SignOutMenuItem>
                    <Typography textAlign='center'>
                        Sign out
                    </Typography>
                </SignOutMenuItem>
                <Link href="/privacy" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setAnchorEl(null)}>
                    <MenuItem >
                        Privacy policy
                    </MenuItem>
                </Link>
            </Menu>
        </>
    )
}

export default AvatarMenu;