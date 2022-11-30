import { useEffect, useState } from "react";

import './Pong.scss';

import Ball from './Ball.js';
import Paddle from './Paddle.js';
import React from "react";
import { End } from "./End";


let lastTime: any = null;
let ball:any = null;
let playerPaddle: any = null;
let computerPaddle: any = null;
let playerScoreElem: any = null;
let computerScoreElem: any = null;

const Pong = () => {

    const [end, setEnd] = useState<boolean>(false);

    function update(time: any) {
        if (lastTime != null){
            const delta = time - lastTime;
            ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
            computerPaddle.update(delta, ball.y);
            if (isLose()){
                handleLose();
            }
            const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
            document.documentElement.style.setProperty('--hue', (hue + delta * 0.01).toString());
        }
        lastTime = time;
        window.requestAnimationFrame(update);
    }

    function isLose(){
        const rect = ball.rect();
        return (rect.right >= window.innerWidth || rect.left <= 0);
    }

    function handleLose(){
        const rect = ball.rect();
        if (rect.right >= window.innerWidth){
            playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
        } else {
            computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
        }
        ball.reset();
        computerPaddle.reset();
        if (parseInt(computerScoreElem.textContent) === 1 || parseInt(playerScoreElem.textContent) === 1)
            setEnd(true);
    }

    document.addEventListener('mousemove', e => {
        playerPaddle.position = (e.y / window.innerHeight) * 100;
    });


    useEffect(() => {
        ball = new Ball(document.getElementById('ball'));
        playerPaddle = new Paddle(document.getElementById('player-paddle'));
        computerPaddle = new Paddle(document.getElementById('computer-paddle'));

        playerScoreElem = document.getElementById('player-score');
        computerScoreElem = document.getElementById('computer-score');

        window.requestAnimationFrame(update);
    });

    return (
        <section id='pong-section'>
            {end? <End scoreOne={parseInt(computerScoreElem.textContent)} scoreTwo={parseInt(playerScoreElem.textContent)} />
                :
                <div className="score">
                    <div id='player-score'>0</div>
                    <div id='computer-score'>0</div>
                </div>
            }
            <div className='ball' id='ball'></div>
            <div className='paddle left' id='player-paddle'></div>
            <div className='paddle right' id='computer-paddle'></div>
        </section>
    );
};

export default Pong;