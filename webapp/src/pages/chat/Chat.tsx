import { Fragment, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import Helpers from "../../helpers/Helpers";
import { io } from 'socket.io-client';
import './Chat.scss';
import { useLocation } from "react-router-dom";

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const ChatBar = () => {

    const [messageContent, setMessageContent] = useState<string>('');
    const [allMessage, setAllMessage] = useState<{content: string, email: string}[]>([]);
    const location = useLocation();

    const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
        e.preventDefault();
        const req = await Helpers.Messagerie.send_message_to_discussion(location?.state?.chat_id ?? '', messageContent);
        if (req) {
            setMessageContent('');
            socket.emit('message', {
                data: {
                    chat_id: location?.state?.chat_id,
                    content: messageContent,
                    email: localStorage.getItem('email')
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

    socket.on('message', (data: { content: string, email: string, chat_id: string }) => {
        if (data?.chat_id === location?.state?.chat_id){
            const output = [...allMessage, {
                email: data?.email,
                content: data?.content
            }];
            setAllMessage(output);
        }
    });

    useEffect(() => {
        getAllMessages();
    }, [false]);

    return (
        <Fragment>
            <div
                id='div-message-chat'
            >
                {allMessage.map((msg: { content: string, email: string }, index) => {
                    return (
                        <div key={index}>
                            { msg.email }: { msg.content }
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
                />
                <br />
                <Button
                    variant="contained"
                    type="submit"
                >
                    Validate
                </Button>
            </form>
        </Fragment>
    );
};

export default ChatBar;