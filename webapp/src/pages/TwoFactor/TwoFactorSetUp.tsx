import { Box, Button, Avatar } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Config from "../../config/Config";
import Helpers from "../../helpers/Helpers";
import { mdTheme } from "../Utils/Dashboard";

//update status to online
const TwoFactorSetUp = () => {

    const [user, setUser] = useState({
        id_42: 0,
        email: '',
        nickname: '',
        avatar: '',
        two_factor_secret: '',
    });

    const [qr, setQr] = useState<boolean>(false);
    const [qrLink, setQrLink] = useState<string>('');
    const navigate = useNavigate();

    const generateQr = async () => {
        try {
            const req = await axios.post(`${Config.Api.url}/2fa/generate`, {
                id_42: user.id_42,
            });
            setQrLink(req.data);
        } catch (e) {
            console.error(e);
            return (null);
        }
        setQr(true);
    };

    useEffect(() => {
        Helpers.Users.me().then((res) => setUser(res!));
    }, []);

    const authenticate = () => {
        Helpers.Users.toggleTwoFactor(true, user.id_42).then((res) => {console.log(res);}); //toggle when qr code scanned
        navigate('/2fa');
    };

    return (
        <>
            {
                <Box
                    component="main" position="fixed"
                    sx={{
                        top:'100px',
                        left:'200px',
                        right:'200px',
                        backgroundColor: mdTheme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                        Open your Google Authenticator app and generate the qr code to save in it
                    {
                        qr ?
                            <>
                                <Avatar src={qrLink} sx={{ width: 256, height: 256 }} variant="square" >
                                </Avatar>
                                <div>
                                    once saved, click on authenticate login with 2FA
                                </div>
                                <Button onClick={authenticate}>
                                    Log in with 2FA
                                </Button>
                            </>
                            :
                            <div></div>
                    }
                    <Button onClick={generateQr}>
                            Generate the 2FA Qr code
                    </Button>
                </Box>
            }
        </>
    );
};

export default TwoFactorSetUp;