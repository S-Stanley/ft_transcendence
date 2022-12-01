import './Profile.scss';
import { Fragment, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';
import UserStats from '../Statistics/UserStats';
import Helpers from '../../helpers/Helpers';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const [user, setUser] = useState({
        email: '',
        nickname: '',
        avatar: ''
    });
    const userToGet = window.location.pathname.split('/')[2];
    const navigate = useNavigate();
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
        <Fragment>
            <h1>
                <Avatar id='avatar-display' alt={user.nickname} src={user.avatar}/>
                <Typography id='nickname'>
                    { user.nickname }
                </Typography>
                <Button id='edit-button' onClick={() => navigate('/user')}>
                    Edit Profile
                </Button>
            </h1>
            <h2>
                <div id='statistics'>
                    <UserStats/>
                </div>
                <Typography id='achievements'>
                    Achievements
                </Typography>
                <div style={{ borderTop: '1px solid black', marginLeft: '22%', marginRight: '35%' }}/>
            </h2>
        </Fragment>
    );
};

export default Profile;