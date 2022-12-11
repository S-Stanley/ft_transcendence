import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { mdTheme } from "../Utils/Dashboard";
import NewAppBar from "../Utils/NewAppBar";
import CancelIcon from '@mui/icons-material/Cancel';
import Helpers from "../../helpers/Helpers";
import { io } from 'socket.io-client';
import { useNavigate } from "react-router-dom";

const Matchmaking = () => {

    const [waiting, setWaiting] = useState<boolean>(false);
    const socket = io('http://localhost:5000', { transports: ['websocket'] });
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id_42: 0,
        email: '',
        nickname: '',
        avatar: '',
    });

    useEffect(() => {
        Helpers.Users.me().then((res) => setUser(res!));
    }, []);

    const match_request = () => {
        Helpers.Matchmaking.getRequests().then((res) => {
            if (res?.result.length === 0)
            {
                setWaiting(true);
                Helpers.Matchmaking.matchRequest(user.id_42).then((res) => console.log(res));
            }
            else
            {
                socket.emit('matchmaking', {
                    data: {
                        target: res?.result[0].id_42.toString(),
                        callback: user.id_42,
                        nickname: user.nickname,
                    }
                });
            }
        });
    };

    const match_cancel = () => {
        setWaiting(false);
        Helpers.Matchmaking.matchCancel(user.id_42).then((res) => console.log(res));
    };

    const showDemands = () => {
        Helpers.Matchmaking.getRequests().then((res) => console.log(res));
    };

    socket.on(user.id_42.toString(), (data: { id_incoming: number, confirmation:boolean, nickname: string }) => {
        if (!data.confirmation)
        {
            Helpers.Matchmaking.matchCancel(user.id_42).then((res) => console.log(res));
            socket.emit('confirmation', {
                data: {
                    target: data.id_incoming.toString(),
                    callback: user.id_42,
                    nickname: user.nickname,
                }
            });
            navigate('/play/online', {
                state: {
                    my_id: user.id_42,
                    opp_id: data.id_incoming,
                    nickname: data.nickname,
                }
            });
        }
        else
        {
            navigate('/play/online', {
                state: {
                    my_id: user.id_42,
                    opp_id: data.id_incoming,
                    nickname: data.nickname,
                }
            });
        }
    });

    return (
        <>
            <NewAppBar/>
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
                <Typography component="h1" variant="h3" color="secondary"
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        mb: '200px',
                    }}
                >
                    This is the matchmaking friend
                </Typography>
                {
                    waiting ?
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CircularProgress color="secondary" sx={{mb: '50px'}} />
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Waiting for opponent ...
                            </Typography>
                            <Button onClick={match_cancel} color='error'>
                                <CancelIcon />
                            </Button>
                        </Box>
                        :
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Button onClick={match_request} color="primary" variant="contained" sx={{mt:'90px'}} >
                                Find opponent
                            </Button>
                        </Box>
                }
                <Button onClick={showDemands}>
                    See demands
                </Button>
            </Box>
        </>
    );
};

export default Matchmaking;