import { Avatar, Button, Card, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Helpers from '../../../helpers/Helpers';
import { useState } from "react";

export const FriendRequestsSent = ({requests}) => {
    const toUserProfile = (nickname) => {
        window.location.href = `users/${nickname}`;
    };
    const [cancelled, setCancelled] = useState(0);
    const requestSentButton = (otherUser) => {
        return (cancelled === 0 ?
            <Button sx={{ ml: 2 }}
                size="small"
                variant="contained"
                color="error"
                onClick={() => {
                    Helpers.Friends.acceptFriendRequest(localStorage.getItem('nickname'), otherUser, false);
                    setCancelled(1);
                }}>
                    Cancel
            </Button>
            :
            <Button sx={{ ml: 2 }}
                size="small"
                variant="contained" disabled
            >
                    Cancelled
            </Button>
        );
    };
    return (requests.length === 0 ?
        <Card>
            <Box>
                <Table  >
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="body1"
                                >
                                    No requests sent...
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
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
                                <TableRow key={req.id ? req.id : 'default'}>
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
                                            {requestSentButton(req.nickname)}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button sx={{mr: 70}}
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