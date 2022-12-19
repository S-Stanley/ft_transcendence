import { Fragment, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Helpers from "../../helpers/Helpers";
import { useNavigate } from "react-router-dom";

import './Messagerie.scss';
import { MessagerieInterface } from "../../interfaces/messagerie";

const Messaging = () => {

    const [userToFind, setUserToFind] = useState<string>("");
    const [allDiscussions, setAllDiscussions] = useState<MessagerieInterface[]>([]);
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

    const navigateToChat = (chat_id: string) => {
        navigate('/chat', {
            state: {
                chat_id:  chat_id
            }
        });
    };

    const get_all_discussions = async(): Promise<void> => {
        const data = await Helpers.Messagerie.get_all_chat_by_user_id(localStorage.getItem('user_id') ?? '');
        if (data) {
            setAllDiscussions(data);
            console.log(data);
        }
    };

    useEffect(() => {
        get_all_discussions();
    }, [false]);

    return (
        <Fragment>
            <div
                id='div-message-messaging'
            >
                {allDiscussions.map((discussion: MessagerieInterface) => {
                    return (
                        <div key={discussion.id} onClick={() => navigateToChat(discussion.id)}>
                            { discussion.type === 'public' ? discussion.name : discussion.nickname}
                        </div>
                    );
                })}
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
        </Fragment>
    );
};

export default Messaging;