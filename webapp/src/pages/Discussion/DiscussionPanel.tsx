import { Grid, Typography, Paper, List, ListItem, ListItemIcon, Avatar, ListItemText, Divider, TextField, Fab, Box, Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import NewAppBar from "../Utils/NewAppBar";
import { mdTheme } from "../Utils/Dashboard";
import { useState, useEffect } from "react";
import Helpers from "../../helpers/Helpers";
import { v4 as uuid } from 'uuid';
import { io } from "socket.io-client";

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const DiscussionPanel = () => {

    const [user, setUser] = useState({
        email: '',
        nickname: '',
        avatar: '',
        current_status: '',
        friends: [''],
        id_42: 0,
        id: 0,
    });

    const [discussions, setDiscussions] = useState([{
        nickname: '',
        avatar: '',
        id: 0,
    }]);

    const [messages, setMessage] = useState([{
        content: '',
        nickname: '',
        sender: 0,
    }]);

    const [target, setTarget] = useState<number>(0);

    const [content, setContent] = useState<string>('');

    const [dialog, setDialog] = useState<boolean>(false);

    const [usernameSearch, setUsernameSearch] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState<string>('');

    const changeUsernameSearch = (e:any) => {
        e.preventDefault();
        setUsernameSearch(e.target.value);
    };

    const sendMessage = (e:any) => {
        e.preventDefault();
        Helpers.Discussion.sendMessage(user.id.toString(), target.toString(), content).then((res) => {
            if (res === 1)
            {
                socket.emit('discussion', {
                    data: {
                        target: target.toString(),
                        content: content,
                        sender: user.id,
                    }
                });
            }
            const output = [...messages, {
                sender: user.id,
                content: content,
                nickname: '',
            }];
            setMessage(output);
        });
        setContent('');
    };

    useEffect(() => {
        Helpers.Users.me().then((res) => {
            setUser(res!);
            Helpers.Discussion.getConversations(res?.id.toString()).then((resz) => {
                setDiscussions(resz!);
                if (resz[0] !== null)
                {
                    Helpers.Discussion.getMessage(resz[0]?.id, res?.id).then((resp) => {
                        setMessage(resp!);
                        setTarget(resz[0]?.id);
                    });
                }
            });
        });
    }, []);

    const display_conversation = (e: any) => {
        e.preventDefault();
        setTarget(e.target.value);
        Helpers.Discussion.getMessage(e.target.value, user.id).then((res) => {
            setMessage(res!);
        });
    };

    const handleChange = (e:any) => {
        e.preventDefault();
        setContent(e.target.value);
    };

    socket.on(user.id.toString() + 'discussion', (data: { content: string, target: string, sender: number }) => {
        console.log('je recois le message');
        const output = [...messages, {
            sender: data?.sender,
            content: data?.content,
            nickname: '',
        }];
        setMessage(output);
    });

    const newConversation = (e:any) => {
        e.preventDefault();
        console.log('create conversation');
        setDialog(true);
    };

    const createConversation = (e:any) => {
        e.preventDefault();
        Helpers.Discussion.createConversation(user.id, usernameSearch).then((res) => {
            if (res === 2)
            {
                setErrorMessage('Create a conversation with yourself ? What a crazy idea !');
                console.log('going here');
            }
            else if (res === 3)
                setErrorMessage('A conversation already exists, you even though you like him you wont talk to him twice more with this');
            else
            {
                setErrorMessage('');
                setDialog(false);
            }
        });
    };


    return (
        <>
            <NewAppBar/>
            <Box
                component="main" position="fixed"
                sx={{
                    top:'100px',
                    left:'300px',
                    backgroundColor: mdTheme.palette.grey[900],
                    height: '100vh',
                    width: '80vw',
                }}
            >
                <Grid container>
                    <Grid item xs={12} >
                        <Typography variant="h5" >Discussion</Typography>
                    </Grid>
                </Grid>
                <Grid container component={Paper} >
                    <Grid item xs={3} >
                        <Divider />
                        <Grid item xs={12} style={{padding: '10px'}}>
                            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                        </Grid>
                        <Divider />
                        <Divider />
                        <Grid item xs={12} style={{padding: '10px'}}>
                            <Button onClick={newConversation}>Create conversation</Button>
                        </Grid>
                        <Divider />
                        <List>
                            {discussions.map((discussion) => (
                                <ListItem key={uuid()}>
                                    <ListItemIcon>
                                        <Avatar alt={discussion.nickname} src={discussion.avatar} />
                                    </ListItemIcon>
                                    <ListItemText>{discussion.nickname}</ListItemText>
                                    <Button onClick={display_conversation} value={discussion.id}>View</Button>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={9}>
                        <List>
                            {messages.slice(-10).map((message) => (
                                <ListItem key={uuid()}>
                                    <Grid container>
                                        {
                                            message.sender === user.id
                                                ?
                                                <>
                                                    <Grid>
                                                        <ListItemText primary={message.content} sx={{ ml: '400px' }}></ListItemText>
                                                    </Grid><Grid item xs={12}>
                                                        <ListItemText secondary="09:30" sx={{ ml: '400px' }}></ListItemText>
                                                    </Grid>
                                                </>
                                                :
                                                <>
                                                    <Grid>
                                                        <ListItemText primary={message.content}></ListItemText>
                                                    </Grid><Grid item xs={12}>
                                                        <ListItemText secondary="09:30"></ListItemText>
                                                    </Grid>
                                                </>
                                        }
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <Grid container style={{padding: '20px'}}>
                            <Grid item xs={11}>
                                <TextField id="outlined-basic-email" label="Type Something" fullWidth value={content} onChange={handleChange}/>
                            </Grid>
                            <Grid xs={1}>
                                <Fab color="primary" aria-label="add" onClick={sendMessage}><SendIcon /></Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    dialog
                        ?
                        <Dialog
                            open={dialog}
                            onClose={() => setDialog(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
			            >
                            <DialogTitle id="alert-dialog-title">
				                {"Create Conversation"}
                            </DialogTitle>
                            <DialogActions>
                                <TextField id="outlined-basic-email" label="Type Username" fullWidth value={usernameSearch} onChange={changeUsernameSearch}/>
				                <Button onClick={createConversation} autoFocus>Create</Button>
                            </DialogActions>
                            {
                                errorMessage === ''
                                    ?
                                    <div></div>
                                    :
                                    <DialogContent>
                                        <Typography variant='body2' color='red'>
                                            *{errorMessage}
                                        </Typography>
                                    </DialogContent>
                            }
			            </Dialog>
                        :
                        <div></div>
                }
            </Box>
        </>
    );
};

export default DiscussionPanel;