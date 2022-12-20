import { Box, Button, Container, Grid, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Loses } from './lost';
import { MatchHistory } from './match-history';
import { Ratio } from './ratio';
import { Pongs } from './pongs';
import { Wins } from './won';
import { Default } from './default';
import { Scored } from './scored';
import { Taken } from './taken';
import Helpers from '../../../helpers/Helpers';
import { LegendaryBattle } from './achievements/legendary-battle';
import { ThisIsSparta } from './achievements/this-is-sparta';
import { DevilWithUs } from './achievements/devil-with-us';
import { FriendlyWin } from './achievements/friendly-win';
import { IAmVeteran } from './achievements/i-am-veteran';
import { LastEffort } from './achievements/last-effort';
import { WhatAWinner } from './achievements/what-a-winner';
import { NeverAlone } from './achievements/never-alone';

const Statistics = () => {

    const [values, setValues] = useState({
        numberPongs: '',
        matchWon: '',
        matchLost: '',
        goalsScored: '',
        goalsTaken: '',
    });

    const [sparta, setSparta] = useState<boolean>(false);
    const [legendary, setLegendary] = useState<boolean>(false);
    const [devil, setDevil] = useState<boolean>(false);
    const [friend, setFriend] = useState<boolean>(false);
    const [veteran, setVeteran] = useState<boolean>(false);
    const [effort, setEffort] = useState<boolean>(false);
    const [winner, setWinner] = useState<boolean>(false);
    const [alone, setAlone] = useState<boolean>(false);

    const calculateStats = (props:any) => {
        setFriend(false); //for eslint
        setAlone(false); //for esling
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
            if (value.player_score === 1 && value.opp_score === 0)
            {
                setSparta(true);
                setEffort(true);
            }
            if (value.player_pongs > 10)
                setLegendary(true);
            if (value.player_pongs === 666)
                setDevil(true);
            if (won + lost === 5)
                setVeteran(true);
            if (won === 2)
                setWinner(true);
            //check if won against friend
            //check if invite sent
        });
        setValues({
            numberPongs: pongs.toString(),
            matchWon: won.toString(),
            matchLost: lost.toString(),
            goalsScored: scored.toString(),
            goalsTaken: taken.toString(),
        });
        setLevel(Math.floor(Math.sqrt(won)) + 1);
        setRest((Math.sqrt(won) + 1) - (Math.floor(Math.sqrt(won)) + 1));
    };

    const getHistory = async () => {
        const res = await Helpers.History.get_match();
        calculateStats(res.data.result.reverse());
    };

    const [level, setLevel] = useState<number>(1);
    const [rest, setRest] = useState<number>(0);
    const [panel, setPanel] = useState<string>('statistics');

    useEffect(() => {getHistory();}, []);

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false} sx={{mb:'50px'}}>
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                        color="secondary"
                    >
						Level {level}
                    </Typography>
                    <LinearProgress
                        value={rest * 100}
                        variant="determinate"
                        color="secondary"
                        sx={{mb:'50px'}}
                    />
                    <Button color={panel === 'statistics' ? "inherit" : "secondary"} variant="contained" size="large" sx={{mr:'20px'}} onClick={() => setPanel('statistics')}>Statistics</Button>
                    <Button color={panel === 'achievements' ? "inherit" : "secondary"} variant="contained" size="large" sx={{mr:'20px'}} onClick={() => setPanel('achievements')}>Achievements</Button>
                    <Button color={panel === 'history' ? "inherit" : "secondary"} variant="contained" size="large" sx={{mr:'20px'}} onClick={() => setPanel('history')}>History</Button>
                </Container>
                { panel === 'statistics' &&
                    <Container maxWidth={false}>
                        <Typography
                            sx={{ mb: 3 }}
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
                    </Container>
                }
                { panel === 'achievements' &&
                    <Container maxWidth={false}>
                        <Typography
                            sx={{ mb: 3 }}
                            variant="h4"
                        >
                            Achievements

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
                                <ThisIsSparta achieved={sparta} />
                            </Grid>
                            <Grid
                                item
                                xl={3}
                                lg={3}
                                sm={6}
                                xs={12}
                            >
                                <LegendaryBattle achieved={legendary} />
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xl={3}
                                xs={12}
                            >
                                <DevilWithUs achieved={devil} />
                            </Grid>
                            <Grid
                                item
                                xl={3}
                                lg={3}
                                sm={6}
                                xs={12}
                            >
                                <FriendlyWin achieved={friend}/>
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xl={3}
                                xs={12}
                            >
                                <IAmVeteran achieved={veteran} />
                            </Grid>
                            <Grid
                                item
                                xl={3}
                                lg={3}
                                sm={6}
                                xs={12}
                            >
                                <LastEffort achieved={effort} />
                            </Grid>
                            <Grid
                                item
                                xl={3}
                                lg={3}
                                sm={6}
                                xs={12}
                            >
                                <WhatAWinner achieved={winner} />
                            </Grid>
                            <Grid
                                item
                                xl={3}
                                lg={3}
                                sm={6}
                                xs={12}
                            >
                                <NeverAlone achieved={alone}/>
                            </Grid>
                        </Grid>
                    </Container>
                }
                { panel === 'history' &&
                    <Container maxWidth={false}>
                        <Typography
                            sx={{ mb: 3, }}
                            variant="h4"
                        >
                            History
                        </Typography>
                        <MatchHistory	/>
                    </Container>
                }
            </Box>
        </>
    );
};

export default Statistics;