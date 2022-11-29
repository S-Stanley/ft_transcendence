import './Game.scss'
import { Fragment } from 'react';
import Pong from './components/Pong';
import { Button } from '@mui/material';

const Game = () => {
    return (
        <Fragment>
            <Button href="/play" variant="contained" color="secondary">
                Exit
            </Button>
            <Pong/>
        </Fragment>
    )
};
export default Game;