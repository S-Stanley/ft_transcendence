import { Button, Container, Grid, Paper } from "@mui/material";
import { MatchHistory } from "./components/match-history";
import Copyright from "../Utils/Copyright";
import Choose from "./components/Choose";
import Connected from "./components/Connected";
import { ChangeEvent } from "react";

const Welcome = () => {

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
    };

    const sendPhoto = () => {
        console.log('sent');
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 220,
                        }}
                    >
                        <Choose />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 220,
                        }}
                    >
                        <Connected />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <MatchHistory  />
                    </Paper>
                </Grid>
            </Grid>
            <br></br>
            <Copyright />
            <div>
                <input accept="image/*" type="file" onChange={event => handleInput(event)}/>
                <Button onClick={sendPhoto}>
                upload
                </Button>
            </div>
        </Container>
    );
};

export default Welcome;