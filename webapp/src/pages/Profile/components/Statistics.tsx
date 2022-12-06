import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Loses } from './lost';
import { MatchHistory } from './match-history';
import { Ratio } from './ratio';
import { Pongs } from './pongs';
import { Wins } from './won';
import { Default } from './default';
import { Scored } from './scored';
import { Taken } from './taken';
import Helpers from '../../../helpers/Helpers';
import { mdTheme } from '../../Utils/Dashboard';
import { useNavigate } from 'react-router-dom';

const   Statistics = () => {

    const [values, setValues] = useState({
        numberPongs: '',
        matchWon: '',
        matchLost: '',
        goalsScored: '',
        goalsTaken: '',
    });

    const calculateStats = (props:any) => {
        let pongs = 0;
        let won = 0;
        let lost = 0;
        let scored = 0;
        let taken = 0;
        props.map((value:any) => {
            pongs += value.player_pongs;
            if (value.player_score === 1)
                won += 1;
            else
                lost += 1;
            scored += value.player_score;
            taken += value.opp_score;
        });
        setValues({
            numberPongs: pongs.toString(),
            matchWon: won.toString(),
            matchLost: lost.toString(),
            goalsScored: scored.toString(),
            goalsTaken: taken.toString(),
        });
    };

    const getHistory = async () => {
        const res = await Helpers.History.get_match();
        calculateStats(res.data.result.reverse());
    };

    useEffect(() => {getHistory();});

    const [user, setUser] = useState({
        email: '',
        nickname: '',
        avatar: ''
    });
    const userToGet = window.location.pathname.split('/')[2];
    const navigate = useNavigate();
    if (user.nickname === '') {
        Helpers.Users.getUser(userToGet).then((res) => setUser(res!));
        if (user.nickname === '') {
            return (
                <Fragment>
                    User not found
                </Fragment>
            );
        }
    }

    return (
        <Box
            component="main" position="fixed"
            sx={{
                top:'100px',
                left:'200px',
                right:'200px',
                backgroundColor: mdTheme.palette.grey[100],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <h1>
                <Avatar id='avatar-display' alt={user.nickname} src={user.avatar}/>
                <Typography id='nickname'>
                    { user.nickname }
                </Typography>
                <Button id='edit-button' onClick={() => navigate('/user')}>
                    Edit Profile
                </Button>
            </h1>
            <Container maxWidth={false}>
                <Typography
                    sx={{ mb: 3, }}
                    variant="h4"
                >
                    Statistics
                </Typography>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <Ratio win={values.matchWon} lose={values.matchLost} />
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <Wins wins={values.matchWon} />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Loses loses={values.matchLost} />
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <Default sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Pongs pongs={values.numberPongs} sx={{ height: '100%' }} />
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <Scored goalsscored={values.goalsScored} />
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <Taken goalstaken={values.goalsTaken} />
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <Default sx={{ height: '100%' }} />
                    </Grid>
                </Grid>
                <MatchHistory	/>
            </Container>
            <Typography
                sx={{ ml: '20px', mt: '20px', }}
                variant="h4"
            >
                    Achievements
            </Typography>
        </Box>
    );
};

export default Statistics;