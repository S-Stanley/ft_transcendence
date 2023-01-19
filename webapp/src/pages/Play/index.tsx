import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { v4 } from 'uuid';

export const Play = () => {

    return (
        <>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    mt:'100px',
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
                    mt:'100px',
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
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    mt:'100px',
                }}
            >
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    onClick={() => {
                        navigator.clipboard.writeText(`http://localhost:3000/play/matchmaking/${v4()}`);
                        toast.success('Private link has been copied into your clipboard');
                    }}
                >
                    Create private game
                </Button>
            </Box>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    mt:'100px',
                }}
            >
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    href="/play/live"
                >
                    Live
                </Button>
            </Box>
        </>
    );
};
