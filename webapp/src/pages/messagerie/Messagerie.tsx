import { Fragment, useState } from "react";
import { Button, TextField } from "@mui/material";
import Helpers from "../../helpers/Helpers";
import { useNavigate } from "react-router-dom";

import './Messagerie.scss';

const MessageBar = () => {

    const [userToFind, setUserToFind] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
        e.preventDefault();
        if (userToFind === localStorage.getItem('email')) {
            alert('Error, you cannot send an message to yourself');
            return ;
        }
        const req = await Helpers.Users.findUserByEmail(userToFind);
        const chat = await Helpers.Messagerie.create_or_get_discussion(userToFind);
        if (req && chat) {
            setUserToFind('');
            navigate('/chat', {
                state: {
                    chat_id:  chat?.chat_id
                }
            });
        }
    };

    return (
        <Fragment>
            <div
                id='div-message-messaging'
            >
            </div>
            <form
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Email of user to send a message"
                    variant="standard"
                    type='email'
                    value={userToFind}
                    onChange={(e) => setUserToFind(e.target.value)}
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

export default MessageBar;