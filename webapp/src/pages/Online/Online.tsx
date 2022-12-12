import { Fragment, useRef, useState } from 'react';
import Pong from './components/Pong';
import { Box, Button, Card, CardContent } from '@mui/material';
import { mdTheme } from '../Utils/Dashboard';
import NewAppBar from '../Utils/NewAppBar';
import { useLocation } from "react-router-dom";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import "./styles.css";

const Online = () => {

    const Time = (props: { remainingTime: any }) => {
        const currentTime = useRef(props.remainingTime);
        const prevTime = useRef(null);
        const isNewTimeFirstTick = useRef(false);
        const [, callRerender] = useState(0);
        if (currentTime.current !== props.remainingTime) {
            isNewTimeFirstTick.current = true;
            prevTime.current = currentTime.current;
            currentTime.current = props.remainingTime;
        } else {
            isNewTimeFirstTick.current = false;
        }
        if (props.remainingTime === 0) {
            setTimeout(() => {
                callRerender((val) => val + 1);
            }, 20);
        }
        const isTimeUp = isNewTimeFirstTick.current;
        return (
            <div className="time-wrapper">
                <div key={props.remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
                    {props.remainingTime}
                </div>
                {prevTime.current !== null && (
                    <div
                        key={prevTime.current}
                        className={`time ${!isTimeUp ? "down" : ""}`}
                    >
                        {prevTime.current}
                    </div>
                )}
            </div>
        );
    };

    const CountDown = () => {
        return (
            <div className="App">
                <h1>
                    CountDown until match
                    <br />
                    Opponent: {location?.state?.nickname}
                </h1>
                <div className="timer-wrapper">
                    <CountdownCircleTimer
                        isPlaying
                        duration={5}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[5, 3, 2, 1]}
                        onComplete={() => setEnd(true)}
                    >
                        {Time}
                    </CountdownCircleTimer>
                </div>
            </div>
        );
    };

    const [end, setEnd] = useState<boolean>(false);
    const location = useLocation();

    return (
        <Fragment>
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
                <>
                	{
                    	end?
                            <>
                                <Button href="/play">
                                    Exit
                                </Button>
                                <Pong my_id={location?.state?.my_id} opp_id={location?.state?.opp_id} nickname={location?.state?.nickname}/>
                            </>
                            :
                            <Card>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <CountDown/>
                                    </Box>
                                </CardContent>
                            </Card>
                    }
                </>
            </Box>
        </Fragment>
    );
};
export default Online;