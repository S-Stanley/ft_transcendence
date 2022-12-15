import { useEffect, useState } from "react";

import './Pong.scss';

import Ball from './Ball.js';
import Paddle from './Paddle.js';
import React from "react";
import { End } from "./End";
import { io } from 'socket.io-client';

import Helpers from '../../../helpers/Helpers';

let lastTime: any = null;
let ball:any = null;
let playerPaddle: any = null;
let computerPaddle: any = null;
let socket_position: any = null;
let playerScoreElem: any = null;
let computerScoreElem: any = null;
let computerPongs: number = 0;
let playerPongs: number = 0;
let stop: boolean = false;
let collision_tmp = false;

const Pong = (props: {my_id: number, opp_id: number, nickname: string, player:number, opp_nickname: string}) => {

    const socket = io('http://localhost:5000', { transports: ['websocket'] });

    const [user, setUser] = useState({
        id_42: 0,
        email: '',
        nickname: '',
        avatar: '',
    });

    useEffect(() => {
        Helpers.Users.me().then((res) => setUser(res!));
    }, []);

    const [end, setEnd] = useState<boolean>(false);

    function update(time: any) {
        if (stop)
            return;
        if (lastTime != null){
            const delta = time - lastTime;
            if (props.player === 1)
            {
                if ((isCollision(playerPaddle.rect(), ball.rect()) || isCollision(computerPaddle.rect(), ball.rect())) && collision_tmp === false)
                {
                    if (isCollision(playerPaddle.rect(), ball.rect()))
                        playerPongs = playerPongs + 1;
                    if (isCollision(computerPaddle.rect(), ball.rect()))
                        computerPongs = computerPongs + 1;
                    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()], 1);
                    collision_tmp = true;
                }
                else
                {
                    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()], 0);
                    collision_tmp = false;
                }
                socket.emit('ball', {
                    data: {
                        target: props.opp_id,
                        x: ball.get_x(),
                        y: ball.get_y(),
                    }
                });
            }
            computerPaddle.position = socket_position;
            if (isLose()){
                handleLose();
            }
            const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
            document.documentElement.style.setProperty('--hue', (hue + delta * 0.01).toString());
        }
        lastTime = time;
        window.requestAnimationFrame(update);
    }

    function isCollision(rect1:any, rect2:any){
        return (rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top);
    }

    function isLose(){
        const rect = ball.rect();
        return (rect.right >= window.innerWidth || rect.left <= 0);
    }

    async function handleLose(){
        if (stop)
            return;
        const rect = ball.rect();
        if (rect.right >= window.innerWidth){
            playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
        } else {
            computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
        }
        if (parseInt(computerScoreElem.textContent) === 1 || parseInt(playerScoreElem.textContent) === 1)
        {
            await Helpers.History.add_match(parseInt(playerScoreElem.textContent), playerPongs, parseInt(computerScoreElem.textContent), props.opp_nickname);
            stop = true;
            setEnd(true);
        }
        ball.reset();
        computerPaddle.reset();
    }

    document.addEventListener('mousemove', e => {
        playerPaddle.position = (e.y / window.innerHeight) * 100;
        socket.emit('paddle', {
            data: {
                target: props.opp_id.toString(),
                position: playerPaddle.position,
            }
        });
    });

    socket.on(user.id_42.toString() + 'paddle', (data: { position: number, }) => {
        socket_position = data.position;
    });

    socket.on(user.id_42.toString() + 'ball', (data: { x: number, y: number }) => {
        ball.set_x(data.x);
        ball.set_y(data.y);
    });

    useEffect(() => {
        ball = new Ball(document.getElementById('ball'));
        if (props.player === 1)
        {
            playerPaddle = new Paddle(document.getElementById('player-paddle'));
            computerPaddle = new Paddle(document.getElementById('computer-paddle'));
        }
        else
        {
            playerPaddle = new Paddle(document.getElementById('computer-paddle'));
            computerPaddle = new Paddle(document.getElementById('player-paddle'));
        }
        playerScoreElem = document.getElementById('player-score');
        computerScoreElem = document.getElementById('computer-score');
        window.requestAnimationFrame(update);
    });

    return (
        <section id='pong-section'>
            {end? <End scoreOne={parseInt(playerScoreElem.textContent)} scoreTwo={parseInt(computerScoreElem.textContent)} player={props.player} nickname={props.nickname} opp_nickname={props.opp_nickname} />
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