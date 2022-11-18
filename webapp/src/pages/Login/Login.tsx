import { Button, Typography } from '@mui/material';
import './Login.scss';
import { Fragment, useEffect } from 'react';
import Helpers from './../../helpers/Helpers';
import { useLocation, useNavigate } from 'react-router-dom';


function Login() {
    const code_url = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-6694130f6db913ca3cd2ea1112756a01c8af82f732601f915369707b205c3b1c&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth2-redirect&response_type=code&state=test';
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    const navigate = useNavigate();

    useEffect(() => {
        if (code)
        {
            Helpers.Users.login(code).then((res) => {
                if (res != null)
                {
                    window.localStorage.setItem('token', res.token);
                    navigate('/home', { state: { logged: true} });
                }
            })
        }
    });
    return (
        <Fragment>
            <form
                style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginRight: 'auto', width: "200px" }}
            >
                <Typography variant="h2" textAlign={'center'}>
                    Login
                </Typography>
                <Button
                    sx={{ 
                    ':hover': {
                            color: 'white',
                            backgroundColor: 'grey',
                            borderColor: 'white'
                },
                color: 'grey', backgroundColor: 'white', borderColor: '#888a81' }} variant="outlined" type="submit" href={ code_url }>Sign up with 42</Button>
            </form>
        </Fragment>
    );
}
export default Login;