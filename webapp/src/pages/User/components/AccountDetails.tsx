import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import Helpers from '../../../helpers/Helpers';

export const AccountProfileDetails = (props:any) => {

    const [user, setUser] = useState({
        email: '',
        nickname: '',
        avatar: '',
    });

    const [original, setOriginal] = useState({
        email: '',
        nickname: '',
        avatar: '',
    });

    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (user.nickname === '') {
            Helpers.Users.me().then((res) => setUser(res!));
            Helpers.Users.me().then((res) => setOriginal(res!));
        }
    }, []);

    const handleChange = (event:any) => {
        event.preventDefault();
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const changeUser = async () => {
        if (user.nickname === original.nickname && user.email === original.email)
        {
            setMessage('change at least one field');
            setError(true);
            return ;
        }
        if (user.nickname !== original.nickname)
        {
            const checkNickname = await Helpers.Users.checkNickname(user.nickname);
            if (checkNickname === false)
            {
                setMessage('nickname is already taken');
                setError(true);
                return ;
            }
        }
        if (user.email !== original.email)
        {
            const checkEmail = await Helpers.Users.checkEmail(user.email);
            if (checkEmail === false)
            {
                setMessage('email already taken');
                setError(true);
                return ;
            }
        }
        await Helpers.Users.changeUserData(user.email, user.nickname);
        window.location.href = `/users/${user.nickname}`;
    };

    return (
        <form
            autoComplete="off"
            noValidate
            {...props}
        >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <Divider />
                <CardContent>

                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Nickname"
                                name="nickname"
                                onChange={handleChange}
                                required
                                value={user.nickname}
                                variant="outlined"
                            />
                            {
                                error ?
                                    <Typography variant='body2' color='red'>
                                    *{message}
                                    </Typography>
                                    :
                                    <div>
                                    </div>
                            }
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                onChange={handleChange}
                                required
                                value={user.email}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <FormControlLabel
                    control={(
                        <Checkbox
                            color="primary"
                            defaultChecked
                        />
                    )}
                    label="2FA Authentication"
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={changeUser}
                    >
                        Save details
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
