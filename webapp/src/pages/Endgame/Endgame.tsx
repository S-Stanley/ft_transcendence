import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import CancelIcon from "@mui/icons-material/Cancel";

const Endgame = () => {
    const location = useLocation();
    const socket = io("http://localhost:5000", { transports: ["websocket"] });
    const navigate = useNavigate();

    const [locations, setLocations] = useState({
        my_id: 0,
        opp_id: 0,
        my_nickname: "",
        opp_nickname: "",
        type: 0,
    });

    const [waiting, setWaiting] = useState<boolean>(false);
    const [oppWaiting, setOppWaiting] = useState<boolean>(false);

    useEffect(() => {
        if (location?.state?.is_one) {
            setLocations({
                my_id: location?.state?.id_one,
                opp_id: location?.state?.id_two,
                my_nickname: location?.state?.player_one,
                opp_nickname: location?.state?.player_two,
                type: location?.state?.type,

            });
        } else {
            setLocations({
                my_id: location?.state?.id_two,
                opp_id: location?.state?.id_one,
                my_nickname: location?.state?.player_two,
                opp_nickname: location?.state?.player_one,
                type: location?.state?.type,
            });
        }
    }, [false]);

    const replay_on = () => {
        if (oppWaiting) {
            socket.emit("replay", {
                data: {
                    target: locations.opp_id.toString(),
                    incoming_id: locations.my_id,
                    incoming_nickname: locations.my_nickname,
                    nickname: locations.opp_nickname,
                    cancel: false,
                    confirmation: true,
                },
            });
            setWaiting(false);
            if (locations.type === 1)
            {
                navigate("/play/bonus", {
                    state: {
                        my_id: locations.my_id,
                        opp_id: locations.opp_id,
                        opp_nickname: locations.opp_nickname,
                        nickname: locations.my_nickname,
                        player: 2,
                    },
                });
            }
            else
            {
                navigate("/play/classic", {
                    state: {
                        my_id: locations.my_id,
                        opp_id: locations.opp_id,
                        opp_nickname: locations.opp_nickname,
                        nickname: locations.my_nickname,
                        player: 2,
                    },
                });
            }
        } else {
            setWaiting(true);
            socket.emit("replay", {
                data: {
                    target: locations.opp_id.toString(),
                    incoming_id: locations.my_id,
                    incoming_nickname: locations.my_nickname,
                    nickname: locations.opp_nickname,
                    cancel: false,
                    confirmation: false,
                },
            });
        }
    };

    const replay_off = () => {
        setWaiting(false);
        socket.emit("replay", {
            data: {
                target: locations.opp_id.toString(),
                incoming_id: locations.my_id,
                incoming_nickname: locations.my_nickname,
                nickname: locations.opp_nickname,
                cancel: true,
                confirmation: false,
            },
        });
    };

    socket.on(
        locations.my_id.toString() + "replay",
        (data: {
            incoming_id: number;
            incoming_nickname: string;
            nickname: string;
            cancel: boolean;
            confirmation: boolean;
        }) => {
            if (data.confirmation) {
                if (locations.type == 1)
                {
                    navigate("/play/bonus", {
                        state: {
                            my_id: locations.my_id,
                            opp_id: locations.opp_id,
                            opp_nickname: locations.opp_nickname,
                            nickname: locations.my_nickname,
                            player: 1,
                        },
                    });
                }
                else
                {
                    navigate("/play/classic", {
                        state: {
                            my_id: locations.my_id,
                            opp_id: locations.opp_id,
                            opp_nickname: locations.opp_nickname,
                            nickname: locations.my_nickname,
                            player: 1,
                        },
                    });
                }
            } else {
                if (data.cancel) {
                    setOppWaiting(false);
                }
                else {
                    setOppWaiting(true);
                }
            }
        }
    );

    return (
        <>
            <Typography sx={{ m: 1 }} variant="h2">
                End Game
            </Typography>
            {location?.state?.score_one > location?.state?.score_two &&
            location?.state?.is_one ? (
                    <div>you won as player one</div>
                ) : location?.state?.score_one < location?.state?.score_two &&
              !location?.state?.is_one ? (
                        <div>you won as player 2</div>
                    ) : (
                        <div>you lost</div>
                    )}
            <Button href="/play">Exit</Button>
            {waiting ? (
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <CircularProgress color="secondary" sx={{ mb: "50px" }} />
                    <Typography
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                    >
                        Waiting for opponent ...
                    </Typography>
                    <Button onClick={replay_off} color="error">
                        <CancelIcon />
                    </Button>
                </Box>
            ) : (
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Button
                        onClick={replay_on}
                        color="primary"
                        variant="contained"
                        sx={{ mt: "90px" }}
                    >
                        Find opponent
                    </Button>
                </Box>
            )}
        </>
    );
};

export default Endgame;
