import { Avatar, Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import PerfectScrollbar from 'react-perfect-scrollbar';
import NewAppBar from "../Utils/NewAppBar";
import { mdTheme } from "../Utils/Dashboard";
import { useEffect, useState } from "react";
import Helpers from "../../helpers/Helpers";
import { v4 as uuid } from 'uuid';

const Discussion = () => {

    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState({
        email: '',
        nickname: '',
        avatar: '',
        current_status: '',
        friends: [''],
        id_42: 0,
        id: 0,
    });

    // eslint-disable-next-line no-unused-vars
    const [discussions, setDiscussions] = useState([{
        nickname: '',
        avatar: '',
    }]);

    useEffect(() => {
        Helpers.Users.me().then((res) => {
            setUser(res!);
            Helpers.Discussion.getConversations(res?.id.toString()).then((res) => {
                setDiscussions(res!);
                console.log(res);
            });
            console.log('me fetch', res);
        });
    }, []);


    return (
        <>
            <NewAppBar/>
            <Box
                component="main" position="fixed"
                sx={{
                    top:'100px',
                    left:'300px',
                    backgroundColor: mdTheme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
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
                                    Last Message
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {discussions.map((discussion) => (
                                        <TableRow key={uuid()}>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        alignItems: 'center',
                                                        display: 'flex'
                                                    }}
                                                >
                                                    <Avatar
                                                        src={discussion.avatar}
                                                        sx={{ mr: 2 }}
                                                    >
                                                    </Avatar>
                                                    <Typography
                                                        color="textPrimary"
                                                        variant="body1"
                                                    >
                                                        {discussion.nickname}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                    coucou c la date
                                            </TableCell>
                                            {/* <TableCell>
                                                <Button
                                                    onClick={() => {toUserProfile(discussion.nickname);}}
                                                    size="small"
                                                    color="secondary"
                                                    variant="outlined"
                                                >
                                        View Profile
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                >
                                        Add Friend
                                                </Button>
                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
};

export default Discussion;