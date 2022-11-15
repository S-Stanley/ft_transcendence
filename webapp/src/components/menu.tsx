import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const UNPROCTED_PAGE = ['/'];

const MenuComponent = () => {
    const navigate = useNavigate();

    const checkAccess = () => {
        if (!UNPROCTED_PAGE.includes(window.location.pathname) && !localStorage.getItem('token')){
            console.error('Unauthorized access');
            navigate('/');
        }
    }

    const disconnectUser = () => {
        localStorage.clear();
        navigate('/');
    }

    React.useEffect(() => {
        checkAccess();
    });

    return (
        <React.Fragment key='menu'>
            <Box m={2} pt={7}>
                <AppBar
                    component="nav"
                >
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Transcendence
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        { window.location.pathname.includes('/home') ? (
                            <React.Fragment>
                                <Button key='Home' sx={{ color: '#fff' }} onClick={() => navigate('/home')}>
                                    Home
                                </Button>
                                <Button key='Messagerie' sx={{ color: '#fff' }} onClick={() => navigate('/home/messagerie')}>
                                    Messagerie
                                </Button>
                                <Button key='Disconnect' sx={{ color: '#fff' }} onClick={disconnectUser} >
                                    Disconnect
                                </Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button key='Login' sx={{ color: '#fff' }} onClick={() => navigate('/home')}>
                                    Login
                                </Button>
                            </React.Fragment>
                        )}
                    </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    );
}

export default MenuComponent;