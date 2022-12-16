import PerfectScrollbar from 'react-perfect-scrollbar';
import { Avatar, Box, Card, Button, Table, TableBody, TableCell, TableRow, Typography, IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Helpers from '../../../helpers/Helpers';
import { useState } from 'react';

export const FriendRequests = ({ requests }) => {
    const [requestStatus, setRequestStatus] = useState('');
    const toUserProfile = (nickname) => {
        window.location.href = `users/${nickname}`;
    };
    const requestButton = (otherUser) => {
        switch (requestStatus) {
        case 'accepted':
            return(
                <Box>
                    <Button sx={{ ml: 2 }}
                        size="small"
                        variant="contained" disabled>
                        Friends
                    </Button>
                </Box>);
        case 'cancelled':
            return(
                <Box>
                    <Button sx={{ ml: 2 }}
                        size="small"
                        variant="contained" disabled>
                        Declined
                    </Button>
                </Box>);
        default:
            return(
                <Box>
                    <IconButton sx={{ml: 2}} onClick={() => {
                        Helpers.Friends.acceptFriendRequest(otherUser, localStorage.getItem('nickname'), true);
                        setRequestStatus('accepted');
                    }}>
                        <DoneIcon/>
                    </IconButton>
                    <IconButton onClick={() => {
                        Helpers.Friends.acceptFriendRequest(otherUser, localStorage.getItem('nickname'), false);
                        setRequestStatus('cancelled');
                    }}>
                        <ClearIcon/>
                    </IconButton>
                </Box>);
        }
    };
    return (requests.length === 0 ?
        <Card>
            <Box>
                <Table>
                    <TableRow>
                        <TableCell>
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                No requests yet...
                            </Typography>
                        </TableCell>
                    </TableRow>
                </Table>
            </Box>
        </Card>
        :
        <Card>
            <PerfectScrollbar>
                <Box>
                    <Table>
                        <TableBody>
                            {requests.map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar
                                                src={req.avatar}
                                                sx={{ mr: 2 }}
                                            >
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {req.nickname}
                                            </Typography>
                                            {requestButton(req.nickname)}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button sx={{mr: 55}}
                                            onClick={() => {toUserProfile(req.nickname);}}
                                            size="small"
                                            color="secondary"
                                            variant="outlined"
                                        >
                                        View Profile
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    );
};