import { Button } from '@mui/material';
import './Login.scss';
import { useEffect } from 'react';
import Helpers from '../../helpers/Helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Login() {
    const code_url = `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
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
    };

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