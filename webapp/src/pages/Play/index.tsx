import { Box, Button } from "@mui/material";
import { mdTheme } from "../Utils/Dashboard";
import NewAppBar from "../Utils/NewAppBar";

export const Play = () => {
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
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        mt:'200px',
                    }}
                >
                    <Button
                        color="secondary"
                        variant="contained"
                        size="large"
                        href="/play/pong"
                    >
                        Play Pong
                    </Button>
                </Box>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        mt:'200px',
                    }}
                >
                    <Button
                        color="secondary"
                        variant="contained"
                        size="large"
                        href="/play/matchmaking"
                    >
                        Matchmaking
                    </Button>
                </Box>
            </Box>
        </>
    );
};
