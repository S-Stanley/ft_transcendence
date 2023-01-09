import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Helpers from "../../helpers/Helpers";
import { toast } from "react-toastify";

const Settings = () => {

    const { chat_id } = useParams();

    const [chatPassword, setChatPassword] = useState<string>('');

    const handleSubmit = async() => {
        const req = await Helpers.Messagerie.update_password_chat(
            chat_id ?? '',
            chatPassword,
            localStorage.getItem('user_id') ?? ''
        );
        if (req) {
            toast.success('The password for this chat has been update');
        }
    };

    return (
        <>
            <div>
                <p>Set a password for this chat</p>
                <TextField
                    inputProps={{
                        'id': "email-input-login"
                    }}
                    label="Enter here the new password"
                    variant="standard"
                    type="password"
                    value={chatPassword}
                    onChange={(e) => setChatPassword(e.target.value)}
                />
                <br/><br/>
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                >
                    Valider
                </Button>
            </div>
            <hr/>
        </>
    );
};

export default Settings;