import { Button } from '@mui/material';
import './Login.scss';
import { useEffect } from 'react';
import Helpers from './../../helpers/Helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Login() {
    const code_url = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8eb36c218c1ff84e8e4a815e0a21d0b2ce13d4712f1e1cce95761c6fbcfaa960&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth2-redirect&response_type`;
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    const navigate = useNavigate();

    const loggUser = async(): Promise<void> => {
        if (code){
            const req = await Helpers.Users.login(code);
            if (req) {
                window.localStorage.setItem('token', req.token);
                toast.success('Successfully logged!', {
                    position: "bottom-left",
                });
                navigate('/home');
            }
        }
    }

    useEffect(() => {
        loggUser();
    });
    return (
        <div className="login-page">
            <form id="form-login">
                <Button id="button-submit-login" type="submit" href={ code_url }>Sign up with 42</Button>
            </form>
        </div>
    );
}
export default Login;