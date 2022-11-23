import { Fragment, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import Helpers from "../../helpers/Helpers";
import { io } from 'socket.io-client';
import './Chat.scss'

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const Chat = () => {

    const [messageContent, setMessageContent] = useState<string>('');
    const [allMessage, setAllMessage] = useState<{content: string, email: string}[]>([]);

    const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
        e.preventDefault();
        const req = await Helpers.Messagerie.send_message_to_discussion(localStorage.getItem('chat_id') ?? '', messageContent);
        if (req) {
            setMessageContent('');
            socket.emit('message', {
                data: {
                    chat_id: localStorage.getItem('chat_id'),
                    content: messageContent,
                    email: localStorage.getItem('email')
                }
            });
        }
    }

    const getAllMessages = async(): Promise<void> => {
        const req = await Helpers.Messagerie.get_message_of_discussion(localStorage.getItem('chat_id') ?? '');
        if (req) {
            setAllMessage(req);
        }
    }

    socket.on('message', (data: { content: string, email: string, chat_id: string }) => {
        if (data?.chat_id === localStorage.getItem('chat_id')){
            const output = [...allMessage, {
                email: data?.email,
                content: data?.content
            }];
            setAllMessage(output);
        }
    })

    useEffect(() => {
        getAllMessages();
    });

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
                    )
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

export default Chat;