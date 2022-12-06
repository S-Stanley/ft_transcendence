import './Profile.scss';
import { Fragment, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Button } from '@mui/material';
import UserStats from '../Statistics/UserStats';
import Helpers from '../../helpers/Helpers';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Profile = () => {
    const [user, setUser] = useState({
        email: '',
        nickname: '',
        avatar: '',
        current_status: ''
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
    const statusMap = new Map([
        ['online', 'success'],
        ['offline', 'error'],
        ['in-game', 'primary']
    ]);
    const getColorStatus = (): any => {
        const color = statusMap.get(user.current_status);
        if (!color) {
            return 'error';
        }
        return color;
    };
    return (
        <Fragment>
            <h1>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Badge color={getColorStatus()} badgeContent='' sx={{ margin:3 }} anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                        <Avatar id='avatar-display' alt={user.nickname} src={user.avatar}/>
                    </Badge>
                </Box>
                <Typography id='nickname'>
                    { user.nickname }
                </Typography>
                { user.nickname === localStorage.getItem('nickname') ?
                    <Button id='edit-button' onClick={() => navigate('/user')}>
                        Edit Profile
                    </Button>
                    :
                    <Button id='add-friend-button' onClick={() => Helpers.Users.addFriend(user.nickname, localStorage.getItem('nickname')!)}>
                        Add Friend
                        <PersonAddIcon sx={{ml: 1, mb: 0.2}}/>
                    </Button>
                }
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