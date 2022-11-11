import { Fragment, useState } from "react";
import { Button, TextField } from "@mui/material";
import Helpers from "../helpers/Helpers";
import { useNavigate } from "react-router-dom";

const Messagerie = () => {

    const [userToFind, setUserToFind] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
        e.preventDefault();
        if (userToFind === localStorage.getItem('email')) {
            alert('Error, you cannot send an message to yourself');
            return ;
        }
        const req = await Helpers.Users.findUserByEmail(userToFind);
        if (req) {
            setUserToFind('');
            navigate('/home/messagerie/chat');
        }
    }

    return (
        <Fragment>
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '500px',
                    marginRight: '500px'
                }}
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

export default Messagerie;