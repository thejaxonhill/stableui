"use client"

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DrawIcon from '@mui/icons-material/Draw';
import EditIcon from '@mui/icons-material/Edit';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { AppBar, Box, Collapse, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import { Session } from "next-auth";
import Link from 'next/link';
import { useState } from "react";
import { SignInButton } from "../common";
import AppsIcon from '@mui/icons-material/Apps';
import AvatarMenu from "./AvatarMenu";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloseIcon from '@mui/icons-material/Close';
import ThemeSwitch from '../common/ThemeSwitch';


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
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();

    return (
        <>
            <AppBar position="fixed" elevation={0}>
                <Toolbar>
                    <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'inherit' }}>
                        <AppsIcon fontSize='large' />
                    </IconButton>
                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Stack direction='row' spacing={1}>
                            <ThemeSwitch />
                            {session &&
                                <AvatarMenu session={session} />
                                ||
                                <SignInButton color="inherit" />}
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar >
            <Drawer
                variant='persistent'
                open={drawerOpen}
                anchor="left"
                hideBackdrop
            >
                <Toolbar >
                    <Stack spacing={2} direction='row'>
                        <Typography variant="h4" >
                            <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                                Stable UI
                            </Link>
                        </Typography>
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
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
                    <Divider />
                    <ListItemButton LinkComponent={Link} href='https://github.com/thejaxonhill/stable-ui' target='_blank' rel='noreferrer'>
                        <ListItemIcon>
                            <GitHubIcon />
                        </ListItemIcon>
                        <ListItemText primary={"GitHub Repo"} />
                    </ListItemButton>
                </List>
                <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 1, textAlign: 'center' }}>
                    <Divider />
                    <Box sx={{ mt: 1 }}>
                        <Link href='/privacy' style={{ color: 'inherit' }}>
                            Privacy policy
                        </Link>
                    </Box>
                </Box>
            </Drawer>
            <Toolbar />
        </>
    )
}

export default Navbar;