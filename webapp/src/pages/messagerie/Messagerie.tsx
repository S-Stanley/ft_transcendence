import { Fragment, useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import Helpers from "../../helpers/Helpers";
import { useNavigate } from "react-router-dom";
import { ListItem, List, ListItemText, Avatar, ListItemAvatar } from '@mui/material';

import './Messagerie.scss';
import { MessagerieInterface } from "../../interfaces/messagerie";
import { toast } from "react-toastify";

const Messaging = () => {

    const [destinationChatName, setDestinationChatName] = useState<string>("");
    const [allDiscussions, setAllDiscussions] = useState<MessagerieInterface[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async(): Promise<void> => {
        if (destinationChatName === localStorage.getItem('email')) {
            alert('Error, you cannot send an message to yourself');
            return ;
        }
        const req = await Helpers.Users.findUserByEmail(destinationChatName);
        const chat = await Helpers.Messagerie.create_or_get_discussion(destinationChatName);
        if (req && chat) {
            setDestinationChatName('');
            navigate('/chat', {
                state: {
                    chat_id:  chat?.chat_id
                }
            });
        }
    };

    const createNewChat = async(): Promise<void> => {
        if (!destinationChatName) {
            toast.error('You cannot create a chat with an empty name');
            return ;
        }
        const req = await Helpers.Messagerie.create_new_public_chat(
            destinationChatName,
            localStorage.getItem('user_id') ?? '',
        );
        if (req) {
            setDestinationChatName('');
            navigate('/chat', {
                state: {
                    chat_id: req
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
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {allDiscussions.map((discussion: MessagerieInterface) => {
                        return (
                            <ListItem
                                alignItems="flex-start"
                                key={discussion.id}
                                onClick={async() => {
                                    if (discussion?.member) {
                                        navigateToChat(discussion.id);
                                    } else {
                                        let pass = '';
                                        if (discussion.password) {
                                            pass = prompt('Please, enter the password requested') ?? '';
                                        }
                                        if (await Helpers.Messagerie.join_chat(
                                            discussion.id,
                                            pass,
                                            localStorage.getItem('user_id') ?? ''
                                        )) {
                                            navigateToChat(discussion.id);
                                        } else {
                                            toast.error('Wrong password');
                                        }
                                    }
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={discussion.type === 'public' ? undefined : discussion?.picture} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={ discussion.type === 'public' ? discussion.name : discussion.nickname }
                                    secondary={
                                        <Fragment>
                                            {discussion?.type === 'public' &&
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    { discussion?.member ? 'member' : 'not-member' } { discussion?.password && ' - need password' }
                                                </Typography>
                                            }
                                        </Fragment>
                                    }
                                />
                                <div key={discussion.id} onClick={() => navigateToChat(discussion.id)}>
                                </div>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
            <div id='div-input-messagerie-email'>
                <TextField
                    label="Email of user to send a message"
                    variant="standard"
                    type='email'
                    value={destinationChatName}
                    onChange={(e) => setDestinationChatName(e.target.value)}
                    inputProps={{
                        'id': 'input-messagerie-email'
                    }}
                />
            </div>
            <br />
            <div id='button-group-new-chat'>
                <Button
                    variant="contained"
                    type="submit"
                    id='submit-button-messagerie'
                    onClick={handleSubmit}
                >
                    Validate
                </Button>
                <br/>
                <Button
                    variant="contained"
                    type="submit"
                    id='submit-button-new-chat'
                    color='secondary'
                    onClick={createNewChat}
                >
                    Create new chat
                </Button>
            </div>
        </Fragment>
    );
};

export default Messaging;
