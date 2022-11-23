import { useState } from 'react';
import Helpers from '../../helpers/Helpers';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import './Login.scss';

function EmailLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
        e.preventDefault();
        const req = await Helpers.Users.login_with_email(email, password);
        if (req){
            setEmail('');
            setPassword('');
            localStorage.setItem('token', req.token);
            localStorage.setItem('email', req.email);
            localStorage.setItem('user_id', req.user_id);
            navigate('/home');
        } else {
            toast.error('Wrong email or wrong password!');
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <Typography variant="h2" textAlign={'center'}>
                    Login
                </Typography>
                <TextField data-testid='email-input-login' label="Email" variant="standard" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <TextField data-testid='password-input-login' label="Password" variant="standard" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br /><br />
                <Button data-testid='buttom-submit-login' variant="contained" type="submit">Valider</Button>
            </form>
        </div>
    );
}

export default EmailLogin;