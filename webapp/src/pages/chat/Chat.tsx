import { Fragment, useEffect, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import Helpers from "../../helpers/Helpers";
import { io } from 'socket.io-client';
import './Chat.scss';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MessagerieInterface } from "../../interfaces/messagerie";

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const Chat = () => {

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [chatInfo, setChatInfo] = useState<MessagerieInterface>();
    const [chatMembers, setChatMembers] = useState<{ nickname: string, avatar: string }[]>();
    const [allMessages, setAllMessages] = useState<{content: string, nickname: string}[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const location = useLocation();
    const navigate = useNavigate();
    const { chat_id } = useParams();

    const handleSubmit = async(): Promise<void> => {
        const req = await Helpers.Messagerie.send_message_to_discussion(location?.state?.chat_id ?? '', answer);
        if (req) {
            setAnswer('');
            socket.emit('message', {
                data: {
                    chat_id: location?.state?.chat_id,
                    content: answer,
                    nickname: localStorage.getItem('nickname'),
                    msg_id: req,
                }
            });
        }
    };

    const getAllMessages = async(): Promise<void> => {
        const req = await Helpers.Messagerie.get_message_of_discussion(location?.state?.chat_id ?? '');
        if (req) {
            setAllMessages(req);
        }
        prompt_user();
    };

    const isUserAdmin = async(): Promise<void> => {
        const req = await Helpers.Messagerie.is_user_admin(
            location?.state?.chat_id,
            localStorage.getItem('user_id') ?? ''
        );
        if (req) {
            setIsAdmin(true);
        }
    };

    const getChatInfo = async() => {
        const req = await Helpers.Messagerie.get_chat_info(chat_id ?? '');
        if (req) {
            setChatInfo(req?.chat);
            setChatMembers(req?.members);
        }
    };

    socket.on(location?.state?.chat_id, (data: { content: string, nickname: string, chat_id: string, avatar: string, msg_id: string }) => {
        setAllMessages([...allMessages, {
            content: data?.content,
            nickname: data?.nickname,
        }]);
    });

    useEffect(() => {
        getAllMessages();
        isUserAdmin();
        getChatInfo();
    }, [false]);

    return (
        <Fragment>
            { isAdmin &&
                <Button onClick={() => navigate(`/chat/${location?.state?.chat_id}/settings`)}>Settings</Button>
            }
            {(chatInfo && chatInfo?.type === 'private') &&
                <div
                    id='dest-private-chat'
                    onClick={() => navigate(`/users/${chatMembers?.find((member) => member?.nickname !== localStorage.getItem('nickname'))?.nickname}`)}
                >
                    <div id='div-avatar-private-chat'>
                        <img
                            id='avatar-dest-private-chat'
                            src={chatMembers?.find((member) => member?.nickname !== localStorage.getItem('nickname'))?.avatar}
                        />
                    </div>
                    <p id='name-dest-private-chat'>
                        {chatMembers?.find((member) => member?.nickname !== localStorage.getItem('nickname'))?.nickname}
                    </p>
                </div>
            }
            <hr/>
            <div
                style={{height: (window.innerHeight * 0.7)}}
            >
                <Box sx={{
                    overflow: "hidden",
                    overflowY: "scroll",
                    height: '90%'
                }}>
                    {allMessages.map((msg, index) => {
                        return (
                            <div
                                key={index}
                                id={`msg-chat-${index}`}
                                className='chat-item'
                            >
                                <div className={`content-message-${msg?.nickname === localStorage.getItem('nickname') ? 'right' : 'left'}`}>
                                    { msg?.content }
                                </div>
                                <div className={`nickname-message-${msg?.nickname === localStorage.getItem('nickname') ? 'right' : 'left'}`}>
                                    Posted by { msg?.nickname }
                                </div>
                            </div>
                        );
                    })}
                </Box>
                <div
                    id='div-submit-button'
                >
                    <TextField
                        variant="standard"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        inputProps={{
                            'id': "answer-chat-input"
                        }}
                    />
                    <Button
                        onClick={() => handleSubmit()}
                        id='button-answer-chat-submit'
                        variant='contained'
                    >
                        Send
                    </Button>
                </div>
            </div>
        </Fragment>
    );
};

export default Chat;