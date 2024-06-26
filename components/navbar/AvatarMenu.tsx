"use client"

import { Avatar, IconButton, Menu, Typography } from "@mui/material";
import { Session } from "next-auth";
import { useState } from "react";
import { SignOutMenuItem } from "../common";

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
            </Menu>
        </>
    )
}

export default AvatarMenu;