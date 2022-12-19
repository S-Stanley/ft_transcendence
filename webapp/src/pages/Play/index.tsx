import { Box, Button } from "@mui/material";

export const Play = () => {
    return (
        <>
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
        </>
    );
};
