import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Session } from "next-auth"
import { SignInButton } from "../common"
import AvatarMenu from "./AvatarMenu"
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DrawIcon from '@mui/icons-material/Draw';
import EditIcon from '@mui/icons-material/Edit';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import Link from 'next/link';

const drawerWidth = 240;

const navComponents = [
    {
        title: "Generate",
        href: "/generate",
        icon: <AutoAwesomeIcon />
    },
    {
        title: "Upscale",
        href: "/upscale",
        icon: <FitScreenIcon />
    },
    {
        title: "Edit",
        href: "/edit",
        icon: <EditIcon />
    },
    {
        title: "Control",
        href: "/control",
        icon: <DrawIcon />
    }
]

type NavbarProps = {
    session: Session | null
}

const Navbar = ({ session }: NavbarProps) => {
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
                <List >
                    {navComponents.map(c =>
                        <ListItem key={c.href} disablePadding>
                            <ListItemButton LinkComponent={Link} href={c.href}>
                                <ListItemIcon>
                                    {c.icon}
                                </ListItemIcon>
                                <ListItemText primary={c.title} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Drawer>
            <Toolbar />
        </>
    )
}

export default Navbar;