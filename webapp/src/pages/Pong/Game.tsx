import { Fragment } from 'react';
import Pong from './components/Pong';
import { Box, Button } from '@mui/material';
import { mdTheme } from '../Utils/Dashboard';
import NewAppBar from '../Utils/NewAppBar';

const Game = () => {
    return (
        <Fragment>
            <NewAppBar/>
            <Box
                component="main" position="fixed"
                sx={{
                    top:'0px',
                    left:'200px',
                    right:'200px',
                    backgroundColor: mdTheme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Button href="/play">
                    Exit
                </Button>
                <Pong/>
            </Box>
        </Fragment>
    );
};
export default Game;