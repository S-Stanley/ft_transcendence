import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Helpers from "../../helpers/Helpers";
import { useNavigate } from "react-router-dom";

import './Messaging.scss';
import { mdTheme } from "../Utils/Dashboard";
import NewAppBar from "../Utils/NewAppBar";

const Messaging = () => {

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
        <>
            <NewAppBar/>
            <Box
                component="main" position="fixed"
                sx={{
                    top:'100px',
                    left:'200px',
                    right:'200px',
                    backgroundColor: mdTheme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
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
                        inputProps={{
                            'id': 'input-messagerie-email'
                        }}
                    />
                    <br />
                    <Button
                        variant="contained"
                        type="submit"
                        id='submit-button-messagerie'
                    >
                        Validate
                    </Button>
                </form>
            </Box>
        </>
    );
};

export default Messaging;