import './Game.scss';
import { Fragment } from 'react';
import Pong from './components/Pong';
import { Button } from '@mui/material';
import Helpers from '../../helpers/Helpers';

const Game = () => {
    const nickname = localStorage.getItem('nickname')!;
    Helpers.Users.updateStatus(nickname, 'in-game');
    return (
        <Fragment>
            <Button href="/play" onClick={() => Helpers.Users.updateStatus(nickname, 'online')}>
                Exit
            </Button>
            <Pong/>
        </Fragment>
    );
};
export default Game;