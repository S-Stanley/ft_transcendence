import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useNavigate } from 'react-router-dom';

const UNPROCTED_PAGE = ['/'];

const MenuComponent = () => {
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);
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
            <Button onClick={() => setOpenMenu(!openMenu)}>menu</Button>
            <Drawer open={openMenu}>
                <Box
                    role="presentation"
                    onClick={() => setOpenMenu(!openMenu)}
                    onKeyDown={() => setOpenMenu(!openMenu)}
                >
                    <List>
                        { window.location.pathname.includes('/home') ? (
                            <React.Fragment>
                                <ListItem key='Home'>
                                    <ListItemButton>
                                        <ListItemText primary='Home' />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem key='Disconnect' onClick={() => disconnectUser()}>
                                    <ListItemButton>
                                        <ListItemText primary='Disconnect' />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem key='Close' onClick={() => setOpenMenu(false) } >
                                    <ListItemButton>
                                        <ListItemText primary='Close' />
                                    </ListItemButton>
                                </ListItem>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <ListItem key='Login'>
                                    <ListItemButton>
                                        <ListItemText primary='Login' />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem key='Close' onClick={() => setOpenMenu(false) } >
                                    <ListItemButton>
                                        <ListItemText primary='Close' />
                                    </ListItemButton>
                                </ListItem>
                            </React.Fragment>
                        )}
                    </List>
                </Box>
            </Drawer>
        </React.Fragment>
    );
}

export default MenuComponent;