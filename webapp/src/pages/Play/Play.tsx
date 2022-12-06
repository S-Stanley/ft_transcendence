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
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    sx={{
                        mt:'200px',
                        ml:'600px',
                    }}
                    href="/play/pong"
                >
                    Play Pong
                </Button>
            </Box>
        </>
    );
};
