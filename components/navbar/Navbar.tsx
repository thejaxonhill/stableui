"use client"

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import DrawIcon from '@mui/icons-material/Draw';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Collapse, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import { Session } from "next-auth";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { SignInButton } from "../common";
import ThemeSwitch from '../common/ThemeSwitch';
import AvatarMenu from "./AvatarMenu";
import { useRouter } from '../../ts/nextjs/navigation';

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
    const { pathname } = useRouter();
    const theme = useTheme()
    const [open, setOpen] = useState<number | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        setDrawerOpen(false)
    }, [pathname])

    return (
        <>
            <AppBar position="fixed" elevation={0}>
                <Toolbar>
                    <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'inherit' }}>
                        <MenuIcon fontSize='large' />
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
                PaperProps={{
                    sx: {
                        background: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff'
                    }
                }}

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
                        <Box key={c.title}>
                            <ListItemButton onClick={() => setOpen(open === i ? null : i)}>
                                <ListItemIcon>
                                    {c.icon}
                                </ListItemIcon>
                                <ListItemText primary={c.title} />
                                {open === i && <ExpandLessIcon /> || <ExpandMoreIcon />}
                            </ListItemButton>
                            <Collapse in={open === i} timeout="auto" unmountOnExit>
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
                        </Box>
                    )}
                    <Divider />
                    <ListItemButton LinkComponent={Link} href='https://github.com/thejaxonhill/stable-ui' target='_blank' rel='noreferrer'>
                        <ListItemIcon>
                            <GitHubIcon />
                        </ListItemIcon>
                        <ListItemText primary={"GitHub Repo"} />
                    </ListItemButton>
                </List>
                <Box sx={{ display: 'flex', alignItems: 'end', height: '100%' }}>
                    <Box sx={{ width: '100%', p: 1, textAlign: 'center' }}>
                        <Divider />
                        <Box sx={{ mt: 1 }}>
                            <Link href='/privacy' style={{ color: 'inherit' }}>
                                Privacy policy
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Drawer >
            <Toolbar />
        </>
    )
}

export default Navbar;