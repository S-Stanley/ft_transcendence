import { Fragment, useState } from 'react';
import Helpers from './../helpers/Helpers';
import MenuComponent from './../components/menu';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
        e.preventDefault();
        const req = await Helpers.Users.login(email, password, nickname);
        if (req){
            setEmail('');
            setPassword('');
            localStorage.setItem('token', req.token);
            navigate('/home');
        }
    }

    return (
        <Fragment>
            <MenuComponent/>
            <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', marginLeft: '500px', marginRight: '500px' }}
            >
                <Typography variant="h2" textAlign={'center'}>
                    Login
                </Typography>
                <TextField label="Email" variant="standard" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <TextField label="Password" variant="standard" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <TextField label="Nickname" variant="standard" type="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                <br /><br />
                <Button variant="contained" type="submit">Valider</Button>
            </form>
        </Fragment>
    );
}

export default Login;
