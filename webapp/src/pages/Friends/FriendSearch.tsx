import { Container } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import Helpers from '../../helpers/Helpers';
import { FriendList } from './customer/friend-list';
import { Box, Card, CardContent, TextField, Typography, } from '@mui/material';
import { FriendRequests } from './customer/friend-requests';


const FriendSearch = () => {

    const [users, setUsers] = useState([{
        nickname: '',
        avatar: '',
        email: '',
        id_42: 0,
    }]);

    const [friendRequests, setFriendRequests] = useState([{
        nickname: '',
        avatar: '',
    }]);

    console.log(friendRequests);

    const [user, setUser] = useState({
        email: '',
        nickname: '',
        avatar: '',
        current_status: '',
        friends: [''],
        id_42: 0,
    });

    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        Helpers.Users.getAllUsers().then((res) => {
            setUsers(res.rows);
            console.log(res.rows);
        });
        Helpers.Users.me().then((res) => setUser(res!));
        Helpers.Friends.getReceivedFriendRequests().then((requests) => setFriendRequests(requests));
    }, []);
    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    };
    return (
        <>
            <Box sx={{ mt: 3 }}>
                <Container maxWidth={false}>
                    <Box>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                m: -1
                            }}
                        >
                            <Typography
                                sx={{ m: 1 }}
                                variant="h4"
                            >
                                Search friend
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ maxWidth: 500 }}>
                                        <TextField
                                            value={search}
                                            onChange={handleChange}
                                            fullWidth
                                            placeholder="Search player"
                                            variant="outlined"
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            m: -1
                        }}
                    >
                        <Typography
                            sx={{ m: 1, mt: 5 }}
                            variant="h4"
                        >
                            Friend Requests
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <FriendRequests requests={friendRequests} />
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <FriendList users={users.filter((value) => value.nickname.includes(search) && value.id_42 != user.id_42)} />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default FriendSearch;