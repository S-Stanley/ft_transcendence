import Pong from './components/Pong';
import { Button } from '@mui/material';
import { mdTheme } from '../Utils/Dashboard';

const Game = () => {
    return (
        <div
            style={{
                backgroundColor: mdTheme.palette.grey[900],
                height: '100vh'
            }}
        >
            <Button href="/play">
                Exit
            </Button>
            <Pong/>
        </div>
    );
};
export default Game;