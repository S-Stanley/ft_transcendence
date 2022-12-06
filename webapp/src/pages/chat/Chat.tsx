import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Helpers from "../../helpers/Helpers";
import { io } from 'socket.io-client';
import './Chat.scss';
import { useLocation } from "react-router-dom";
import { mdTheme } from "../Utils/Dashboard";
import NewAppBar from "../Utils/NewAppBar";

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const ChatBar = () => {

    const [messageContent, setMessageContent] = useState<string>('');
    const [allMessage, setAllMessage] = useState<{content: string, nickname: string}[]>([]);
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

    socket.on(location?.state?.chat_id, (data: { content: string, nickname: string, chat_id: string }) => {
        const output = [...allMessage, {
            nickname: data?.nickname,
            content: data?.content
        }];
        setAllMessage(output);
    });

    useEffect(() => {
        getAllMessages();
    }, [false]);

    return (
        <>
            <NewAppBar/>
            <Box
                component="main" position="fixed"
                sx={{
                    top:'100px',
                    left:'300px',
                    backgroundColor: mdTheme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <div
                    id='div-message-chat'
                >
                    {allMessage.map((msg: { content: string, nickname: string }, index) => {
                        return (
                            <div key={index} id={`message-content-${index}`}>
                                { msg.nickname }: { msg.content }
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
            </Box>
        </>
    );
};

export default ChatBar;