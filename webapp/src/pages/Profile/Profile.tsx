import './Profile.scss';
import { Fragment, useState } from 'react';
import { Box } from '@mui/material';
import Statistics from './components/Statistics';
import Helpers from '../../helpers/Helpers';
import { mdTheme } from '../Utils/Dashboard';
import NewAppBar from '../Utils/NewAppBar';


const Profile = () => {
    const [user, setUser] = useState({
        email: '',
        nickname: '',
        avatar: ''
    });
    const userToGet = window.location.pathname.split('/')[2];
    if (user.nickname === '') {
        Helpers.Users.getUser(userToGet).then((res) => setUser(res!));
        if (user.nickname === '') {
            return (
                <Fragment>
                    User not found
                </Fragment>
            );
        }
    }
    return (
        <>
            <NewAppBar/>
            <Box
                component="main" position="fixed"
                sx={{
                    top:'100px',
                    left:'200px',
                    right:'200px',
                    backgroundColor: mdTheme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <div id='statistics'>
                    <Statistics />
                </div>
                <div style={{ borderTop: '1px solid black', marginLeft: '22%', marginRight: '35%' }}/>
            </Box>
        </>
    );
};

export default Profile;