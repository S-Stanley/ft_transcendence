import PerfectScrollbar from 'react-perfect-scrollbar';
import { Avatar, Box, Card, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import Helpers from '../../../helpers/Helpers';
import { useNavigate } from 'react-router-dom';

export const FriendList = ({ users }) => {

    const navigate = useNavigate();

    return (
        <Card>
            <PerfectScrollbar>
                <Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Username
                                </TableCell>
                                <TableCell>
                                    Ratio
                                </TableCell>
                                <TableCell>
                                    Last Connection
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((users) => (
                                <TableRow key={users.id}>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar
                                                src={users.avatar}
                                                sx={{ mr: 2 }}
                                            >
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {users.nickname}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        0.75 (hc)
                                    </TableCell>
                                    <TableCell>
                                        07/12/2022 (hc)
                                    </TableCell>
                                    <TableCell>
                                        {users.email}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => navigate(`/users/${users.nickname}`)}
                                            size="small"
                                            color="secondary"
                                            variant="outlined"
                                        >
                                        View Profile
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => {Helpers.Friends.sendFriendRequest(users.nickname, localStorage.getItem('nickname'));}}
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                        >
                                        Add Friend
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