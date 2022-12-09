import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from '../Utils/listItems';
import { useEffect } from 'react';
import Helpers from '../../helpers/Helpers';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, Button, Drawer, Toolbar } from '@mui/material';
import React, { useState } from 'react';


interface AnotherAppBarProps extends MuiAppBarProps {
    open?: boolean;
    children: React.ReactNode;
}

const drawerWidth: number = 175;

const AnotherAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AnotherAppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen, //leavingScreen for exit
        }),
    }),
}));

const NewAppBar = (props:any) => {

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [user, setUser] = useState({
        email: `${props.coucou}`,
        nickname: '',
        avatar: '',
    });

    const disconnectUser = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    useEffect(() => {
        if (user.nickname === '') {
            Helpers.Users.me().then((res:any) => setUser(res!));
        }
    }, []);

    return (
        <>
            <AnotherAppBar position="absolute" open={open}>
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
                        <Button onClick={() => window.location.href = (`/home`)}>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="white"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                Transcendance
                            </Typography>
                        </Button>
                    </Typography>
                    <IconButton onClick={() => window.location.href = (`/users/${user.nickname}`)}>
                        <Avatar alt={user.nickname} src={user.avatar} sx={{height: '40px', width: '40px' }}></Avatar>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' } }}
                    >
                        { user.nickname === '' ? 'invité' :
                            <Button id="button-nickname" onClick={() => window.location.href = (`/users/${user.nickname}`)}>
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
            </AnotherAppBar>
            {
                open?
                    <Drawer variant="permanent" open={false}>
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
                    :
                    <div>
                    </div>
            }
            <Toolbar />
        </>
    );
};



export default NewAppBar;