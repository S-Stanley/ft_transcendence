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

    const navigate = useNavigate();
    if (user.nickname === '') {
        Helpers.Users.me().then((res) => setUser(res!));
    }
    return (
        <Fragment>
            <Avatar id='avatar-display' alt={user.nickname} src={user.avatar}/>
            <Typography id='nickname'>
                { user.nickname }
            </Typography>
            <Button id='edit-button' onClick={() => navigate('/user')}>
                Edit Profile
            </Button>
            <div id='statistics'>
                <UserStats/>
            </div>
            <Typography id='achievements'>
                Achievements
            </Typography>
            <div style={{ borderTop: '1px solid black', marginLeft: '30%', marginRight: '35%' }}/>
        </Fragment>
    );
};

export default Profile;