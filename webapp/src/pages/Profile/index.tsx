import React, { useState } from 'react';
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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { mainListItems, secondaryListItems } from '../Utils/listItems';
import { mdTheme, Drawer, AppBar } from '../Utils/Dashboard';
import { useNavigate } from 'react-router-dom';
import Helpers from '../../helpers/Helpers';
import { Avatar, Button } from '@mui/material';
import Profile from './Profile';


const UserProfile = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        nickname: '',
        avatar: ''
    });
    const disconnectUser = () => {
        localStorage.clear();
        navigate('/');
    };
    if (user.nickname === '') {
        Helpers.Users.me().then((res) => setUser(res!));
    }
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
                        <IconButton onClick={() => navigate(`/users/${user.nickname}`)}>
                            <Avatar alt={user.nickname} src={user.avatar} sx={{height: '40px', width: '40px' }}></Avatar>
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' } }}
                        >
                            { user.nickname === '' ? 'invité' :
                                <Button id="button-nickname" onClick={() => navigate(`/users/${user.nickname}`)}>
                                    { user.nickname }
                                </Button>
                            }
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
                    <Toolbar />
                    <Profile />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default UserProfile;