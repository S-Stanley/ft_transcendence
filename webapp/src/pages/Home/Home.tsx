import { Box, Container, Grid, Paper } from "@mui/material";
import { MatchHistory } from "./components/match-history";
import Copyright from "../Utils/Copyright";
import Choose from "./components/Choose";
import Connected from "./components/Connected";
import { mdTheme } from "../Utils/Dashboard";
import NewAppBar from "../Utils/NewAppBar";

const Home = () => (

    <>
        <NewAppBar/>
        <Box
            component="main" position="fixed"
            sx={{
                top:'100px',
                left:'300px',
                backgroundColor: mdTheme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
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
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <MatchHistory  />
                        </Paper>
                    </Grid>
                </Grid>
                <br></br>
                <Copyright />
            </Container>
        </Box>
    </>
);

export default Home;