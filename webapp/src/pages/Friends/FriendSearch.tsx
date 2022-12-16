import { Container } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import Helpers from '../../helpers/Helpers';
import { FriendList } from './customer/friend-list';
import { Box, Card, CardContent, TextField, Typography, } from '@mui/material';
import { mdTheme } from '../Utils/Dashboard';
import NewAppBar from '../Utils/NewAppBar';

const FriendSearch = () => {

    const [users, setUsers] = useState([{
        nickname: '',
        avatar: '',
        email: '',
        id_42: 0,
    }]);

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
    }, []);

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    };

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
                        <Box sx={{ mt: 3 }}>
                            <FriendList users={users.filter((value) => value.nickname.includes(search) && value.id_42 != user.id_42)} />
                        </Box>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default FriendSearch;