"use client"

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DrawIcon from '@mui/icons-material/Draw';
import EditIcon from '@mui/icons-material/Edit';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { AppBar, Box, Collapse, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Session } from "next-auth";
import Link from 'next/link';
import { useState } from "react";
import { SignInButton } from "../common";
import AvatarMenu from "./AvatarMenu";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const drawerWidth = 240;

const navComponents = [
    {
        title: "Generate",
        options: [
            {
                title: "Stable Image Ultra",
                href: "/generate/ultra"
            },
            {
                title: "Stable Image Core",
                href: "/generate/core"
            },
            {
                title: "Stable Diffusion 3",
                href: "/generate/sd3"
            }
        ],
        icon: <AutoAwesomeIcon />
    },
    {
        title: "Upscale",
        options: [
            {
                title: "Conservative",
                href: "/upscale/conservative"
            },
            {
                title: "Creative",
                href: "/upscale/creative"
            }
        ],
        icon: <FitScreenIcon />
    },
    {
        title: "Edit",
        options: [
            {
                title: "Erase",
                href: "/edit/erase"
            },
            {
                title: "Inpaint",
                href: "/edit/inpaint"
            },
            {
                title: "Outpaint",
                href: "/edit/outpaint"
            },
            {
                title: "Search and Replace",
                href: "/edit/search-and-replace"
            },
            {
                title: "Remove Background",
                href: "/edit/remove-background"
            }
        ],
        icon: <EditIcon />
    },
    {
        title: "Control",
        options: [
            {
                title: "Sketch",
                href: "/control/sketch"
            },
            {
                title: "Structure",
                href: "/control/structure"
            }
        ],
        icon: <DrawIcon />
    }
]

type NavbarProps = {
    session: Session | null
}

const Navbar = ({ session }: NavbarProps) => {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" elevation={0}>
                <Toolbar>
                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                        {session &&
                            <AvatarMenu session={session} />
                            ||
                            <SignInButton color="inherit" />}
                    </Box>
                </Toolbar>
            </AppBar >
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar >
                    <Typography variant="h4" >
                        Stable UI
                    </Typography>
                </Toolbar>
                <Divider />
                <List disablePadding component="nav">
                    {navComponents.map((c, i) =>
                        <>
                            <ListItemButton key={c.title} onClick={() => setOpen(open === i ? null : i)}>
                                <ListItemIcon>
                                    {c.icon}
                                </ListItemIcon>
                                <ListItemText primary={c.title} />
                                {open === i && <ExpandLessIcon /> || <ExpandMoreIcon />}
                            </ListItemButton>
                            <Collapse in={open === i}>
                                <Divider />
                                <List component="div" disablePadding>
                                    {c.options.map(o =>
                                        <ListItemButton
                                            key={o.href}
                                            LinkComponent={Link}
                                            href={o.href}
                                            sx={{ pl: 4 }}>
                                            <ListItemText primary={o.title} />
                                        </ListItemButton>
                                    )}
                                </List>
                            </Collapse>
                        </>
                    )}
                </List>
            </Drawer>
            <Toolbar />
        </>
    )
}

export default Navbar;