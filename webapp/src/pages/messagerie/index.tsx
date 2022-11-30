import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from '../Utils/listItems';
import { mdTheme, Drawer, AppBar } from '../Utils/Dashboard';
import { useEffect, useState } from 'react';
import Helpers from '../../helpers/Helpers';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MessageBar from './Messagerie';

const Messaging = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        nickname: ''
    });
    const disconnectUser = () => {
        localStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        if (user.nickname === '') {
            Helpers.Users.me().then((res) => setUser(res!));
        }
    });

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Transcendence
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ marginRight: '310px', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Arigato { user.nickname === '' ? 'invité' : user.nickname }
                        </Typography>
                        <IconButton color="inherit">
                            <Badge color="secondary">
                                <ExitToAppIcon onClick={disconnectUser}/>
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <MessageBar />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Messaging;