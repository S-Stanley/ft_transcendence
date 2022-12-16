import './Profile.scss';
import { Fragment, useReducer, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Button } from '@mui/material';
import Helpers from '../../helpers/Helpers';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import Statistics from './components/Statistics';
import NewAppBar from '../Utils/NewAppBar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

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
    const friendStatusMap = new Map([
        ['accepted', 'request-sent-button'],
        ['to_accept', 'request-sent-button'],
        ['pending', 'request-sent-button'],
        ['cancelled', 'add-friend-button']
    ]);
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
                <Button id={friendStatusMap.get(userFriendStatus)}>
                    { buttonText }
                    <PersonAddIcon sx={{ml: 1, mb: 0.2}}/>
                </Button>);
        case 'to_accept':
            return(
                <Button id={friendStatusMap.get(userFriendStatus)}>
                    { buttonText }
                    <DoneIcon sx={{ml: 1, mb: 0.3}} onClick={() => {
                        Helpers.Friends.acceptFriendRequest(userToGet, localStorage.getItem('nickname')!, true);
                        forceUpdate();
                    }}/>
                    <ClearIcon sx={{ml: 1, mb: 0.3}} onClick={() => {
                        Helpers.Friends.acceptFriendRequest(userToGet, localStorage.getItem('nickname')!, false);
                        forceUpdate();
                    }}/>
                </Button>);
        case 'pending':
            return(
                <Button id={friendStatusMap.get(userFriendStatus)}>
                    { buttonText }
                    <PersonAddIcon sx={{ml: 1, mb: 0.2}}/>
                </Button>);
        default:
            return(
                <Button id={friendStatusMap.get(userFriendStatus)} onClick={() => sendFriendRequest()}>
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
            <NewAppBar/>
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
                <div id='statistics'>
                    <Statistics/>
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