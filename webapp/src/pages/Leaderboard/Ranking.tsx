import { Container } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import Helpers from '../../helpers/Helpers';
import { FriendList } from './customer/friend_list';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Typography,
} from '@mui/material';

const Ranking = () => {

    const [users, setUsers] = useState([{
        nickname: '',
        avatar: '',
        id: 0,
        email: '',
    }]);

    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        Helpers.Users.getAllUsers().then((res) => {
            setUsers(res.rows);
            console.log(res.rows);
        });
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
                    <Box sx={{ mt: 3 }}>
                        <FriendList users={users.filter((value) => value.nickname.includes(search))} />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Ranking;