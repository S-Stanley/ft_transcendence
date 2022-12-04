import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { mainListItems, secondaryListItems } from '../Utils/listItems';
import { mdTheme } from '../Utils/Dashboard';
// import { useNavigate } from 'react-router-dom';
import Helpers from '../../helpers/Helpers';
import Profile from './Profile';
import { NavBar } from '../NavBar/NavBar';


const UserProfile = () => {
    const [open, setOpen] = React.useState(true);
    const [count, setCount] = React.useState(0);
    const [user, setUser] = useState({
        email: '',
        nickname: '',
        avatar: ''
    });
    if (user.nickname === '') {
        Helpers.Users.me().then((res) => setUser(res!));
    }
    console.log("parent rerender");
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <NavBar open={open} count={count} onChange={() => {setOpen(!open); setCount(count + 1); console.log("ca tente");}}/>
                <Profile />
            </Box>
        </ThemeProvider>
    );
};

export default UserProfile;