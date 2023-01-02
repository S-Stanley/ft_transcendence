import './Profile.scss';
import { Fragment, useReducer, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Button, IconButton } from '@mui/material';
import Helpers from '../../helpers/Helpers';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import UserInfos from './components/UserInfos';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import GroupIcon from '@mui/icons-material/Group';

const Profile = () => {
    const [user, setUser] = useState({
        email: '',
        nickname: '',
        avatar: '',
        current_status: '',
        friends: ['']
    });
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    let isFriend = false;
    const [buttonText, setButtonText] = useState('');
    const [userFriendStatus, setUserFriendStatus] = useState('');
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
    const buttonTextMap = new Map([
        ['accepted', 'Friends'],
        ['to_accept', 'To accept'],
        ['pending', 'Request sent'],
        ['cancelled', 'Add friend']
    ]);
    const getFriendStatus = (): any => {
        Helpers.Friends.getFriendRequestStatus(userToGet).then(res => {
            setUserFriendStatus(res);
            setButtonText(buttonTextMap.get(userFriendStatus)!);
        });
        if (userFriendStatus === 'accepted') {
            isFriend = true;
        }
    };
    getFriendStatus();
    const displayButton = (): any => {
        switch (userFriendStatus) {
        case 'accepted':
            return(
                <Button size="small"
                    color="inherit"
                    variant="contained">
                    { buttonText }
                    <GroupIcon sx={{ml: 1, mb: 0.2}}/>
                </Button>);
        case 'to_accept':
            return(
                <div>
                    <Button size="small"
                        color="inherit"
                        variant="contained">
                        { buttonText }
                    </Button>
                    <IconButton onClick={() => {
                        Helpers.Friends.acceptFriendRequest(userToGet, localStorage.getItem('nickname')!, true);
                        forceUpdate();
                    }}>
                        <DoneIcon sx={{ml: 1, mb: 0.3}}/>
                    </IconButton>
                    <IconButton onClick={() => {
                        Helpers.Friends.acceptFriendRequest(userToGet, localStorage.getItem('nickname')!, false);
                        forceUpdate();
                    }}>
                        <ClearIcon sx={{ml: 1, mb: 0.3}}/>
                    </IconButton>
                </div>);
        case 'pending':
            return(
                <Button size="small"
                    color="primary"
                    variant="contained" disabled>
                    { buttonText }
                    <PersonAddIcon sx={{ml: 1, mb: 0.2}}/>
                </Button>);
        case 'cancelled':
            return(
                <Button
                    size="small"
                    color="inherit"
                    variant="contained"
                    onClick={() => sendFriendRequest()}>
                    Add friend
                    <PersonAddIcon sx={{ml: 1, mb: 0.2}}/>
                </Button>);
        }
    };
    const sendFriendRequest = () => {
        setButtonText('Request sent');
        Helpers.Friends.sendFriendRequest(user.nickname, localStorage.getItem('nickname')!);
    };
    return (
        <Fragment>
            <h1>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    { isFriend ?
                        <Badge color={getColorStatus()} badgeContent='' sx={{ margin:3 }} anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}>
                            <Avatar id='avatar-display' alt={user.nickname} src={user.avatar}/>
                        </Badge>
                        :
                        <Avatar id='avatar-display' alt={user.nickname} src={user.avatar}/>
                    }
                </Box>
                <Typography id='nickname'>
                    { user.nickname }
                </Typography>
                { user.nickname === localStorage.getItem('nickname') ?
                    <Button id='edit-button' onClick={() => navigate('/user')}>
                        Edit Profile
                    </Button>
                    :
                    <div>{ displayButton() }</div>
                }
            </h1>
            <h2>
`                <div id='statistics'>
                    <UserInfos/>
                </div>
            </h2>`
        </Fragment>
    );
};

export default Profile;