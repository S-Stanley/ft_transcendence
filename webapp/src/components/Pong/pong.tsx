import { useState } from 'react';
import './pong.scss';
import { io } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';

/*
    UP -> W
    DOWN -> S

    MAX MOUVEMENT = 60 (300/5)
        5 is the margin while getting down the controller
        300 = height of the game - height of the controller
        We put the max at 58 because :
            We start from 0
            We need a box juste in case the controller is not going out of the box

*/

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const Pong = () => {

    const [numberOfMouvement, setNumberOfMouvement] = useState<number>(0);
    const [playerId] = useState<string>('second-pong-controller');
    const [searchParams] = useSearchParams();

    const handleKeyPress = (e: {key: string}) => {
        const key = e?.key.toLowerCase();
        if (key !== 'w' && key !== 's') {
            return ;
        }
        if (key === 'w'){
            if (numberOfMouvement <= 0) {
                return ;
            }
            setNumberOfMouvement(numberOfMouvement - 1)
        }
        if (key === 's'){
            if (numberOfMouvement >= 58) {
                return ;
            }
            setNumberOfMouvement(numberOfMouvement + 1);
        }
        socket.emit('game-player-move', {
            data: {
                player_id: searchParams.get('player_id'),
                position: numberOfMouvement * 5,
                direction: key === 'w' ? 'up' : 'down',
                game_id: '0'
            }
        });
    }

    const handleMovement = (player_id: string, direction: string, position: string) => {
        const controller = document.getElementById(player_id);
        if (!controller){
            return;
        }
        if (direction === 'up'){
            const actual_margin = parseInt(controller.style.marginTop?.split('px')[0]);
            if (actual_margin) {
                controller.style.marginTop = `${position}px`;
            }
        }
        if (direction === 'down'){
            const actual_margin = parseInt(controller.style.marginTop?.split('px')[0]);
            if (!actual_margin) {
                controller.style.marginTop = '1px';
            } else {
                controller.style.marginTop = `${position}px`;
            }
        }
    }

    socket.on('game-player-move', (data: { player_id: string, direction: string, position: string, game_id: string }) => {
        if (data?.game_id === '0'){
            handleMovement(data?.player_id, data?.direction, data?.position);
        }
    });

    return (
        <div id='pong-game' onKeyPress={handleKeyPress} tabIndex={0}>
            <div id='controller-area'>
                <div id='pong-controller'>

                </div>
                <div id='second-pong-controller'>

                </div>
            </div>
        </div>
    );
};

export default Pong;