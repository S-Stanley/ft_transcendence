import { Fragment, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import Helpers from "../../helpers/Helpers";
import { io } from 'socket.io-client';
import './Chat.scss';
import { useLocation, useNavigate } from "react-router-dom";

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const Chat = () => {

    const [messageContent, setMessageContent] = useState<string>('');
    const [allMessage, setAllMessage] = useState<{content: string, nickname: string}[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
        e.preventDefault();
        const req = await Helpers.Messagerie.send_message_to_discussion(location?.state?.chat_id ?? '', messageContent);
        if (req) {
            setMessageContent('');
            socket.emit('message', {
                data: {
                    chat_id: location?.state?.chat_id,
                    content: messageContent,
                    nickname: localStorage.getItem('nickname')
                }
            });
        }
    };

    const getAllMessages = async(): Promise<void> => {
        const req = await Helpers.Messagerie.get_message_of_discussion(location?.state?.chat_id ?? '');
        if (req) {
            setAllMessage(req);
        }
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

    socket.on(location?.state?.chat_id, (data: { content: string, nickname: string, chat_id: string }) => {
        const output = [...allMessage, {
            nickname: data?.nickname,
            content: data?.content
        }];
        setAllMessage(output);
    });

    useEffect(() => {
        getAllMessages();
        isUserAdmin();
    }, [false]);

    return (
        <Fragment>
            { isAdmin &&
                <Button onClick={() => navigate(`/chat/${location?.state?.chat_id}/settings`)}>Settings</Button>
            }
            <div
                id='div-message-chat'
            >
                {allMessage.map((msg: { content: string, nickname: string }, index) => {
                    return (
                        <div key={index} id={`message-content-${index}`}>
                            <u id='nickname-user-chat' onClick={() => navigate(`/users/${msg.nickname}`)}>{ msg.nickname }</u>: { msg.content }
                        </div>
                    );
                })}
            </div>
            <form
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Your message"
                    variant="standard"
                    type='text'
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    inputProps={{
                        'id': 'input-private-chat'
                    }}
                />
                <br />
                <Button
                    variant="contained"
                    type="submit"
                    id='submit-button-chat'
                >
                    Validate
                </Button>
            </form>
        </Fragment>
    );
};

export default Chat;