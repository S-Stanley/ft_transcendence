import { Fragment, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import Helpers from "../helpers/Helpers";

const Chat = () => {

    const [messageContent, setMessageContent] = useState<string>('');
    const [allMessage, setAllMessage] = useState([]);

    const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
        e.preventDefault();
        const req = await Helpers.Messagerie.send_message_to_discussion(localStorage.getItem('chat_id') ?? '', messageContent);
        if (req) {
            setMessageContent('');
        }
        getAllMessages();
    }

    const getAllMessages = async(): Promise<void> => {
        const req = await Helpers.Messagerie.get_message_of_discussion(localStorage.getItem('chat_id') ?? '');
        if (req) {
            setAllMessage(req);
        }
    }

    useEffect(() => {
        getAllMessages();
    }, [false]);

    return (
        <Fragment>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '500px',
                    marginRight: '500px'
                }}
            >
                {allMessage.map((msg: { id: string, content: string }) => {
                   return (
                        <div key={msg.id}>
                            { msg.content }
                        </div>
                    )
                })}
            </div>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '500px',
                    marginRight: '500px'
                }}
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