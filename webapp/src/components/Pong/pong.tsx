import { useEffect, useState } from 'react';
import './pong.scss';

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

const Pong = () => {

    const [numberOfMouvement, setNumberOfMouvement] = useState<number>(0);
    const [playerId] = useState<string>('second-pong-controller');

    const handleMovement = (e: any) => {
        const controller = document.getElementById(playerId);
        if (e?.key === 'w' ||e?.key === 'W' ){
            if (!controller || numberOfMouvement < 0){
                return;
            }
            const actual_margin = parseInt(controller.style.marginTop?.split('px')[0]);
            if (actual_margin) {
                controller.style.marginTop = `${parseInt(controller.style.marginTop?.split('px')[0]) - 5}px`;
            }
            setNumberOfMouvement(numberOfMouvement - 1);
        }
        if (e?.key === 's' || e?.key === 'S'){
            if (!controller || numberOfMouvement > 58){
                return;
            }
            const actual_margin = parseInt(controller.style.marginTop?.split('px')[0]);
            if (!actual_margin) {
                controller.style.marginTop = '5px';
            } else {
                controller.style.marginTop = `${parseInt(controller.style.marginTop?.split('px')[0]) + 5}px`;
            }
            setNumberOfMouvement(numberOfMouvement + 1);
        }
    }

    return (
        <div id='pong-game' onKeyPress={handleMovement} tabIndex={0}>
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