import { Grid, Typography, Paper, List, ListItem, ListItemIcon, Avatar, ListItemText, Divider, TextField, Fab, Box, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import NewAppBar from "../Utils/NewAppBar";
import { mdTheme } from "../Utils/Dashboard";
import { useState, useEffect } from "react";
import Helpers from "../../helpers/Helpers";
import { v4 as uuid } from 'uuid';

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

    // const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
    //     e.preventDefault();
    //     const req = await Helpers.Messagerie.send_message_to_discussion(location?.state?.chat_id ?? '', messageContent);
    //     if (req) {
    //         setMessageContent('');
    //         socket.emit('message', {
    //             data: {
    //                 chat_id: location?.state?.chat_id,
    //                 content: messageContent,
    //                 nickname: localStorage.getItem('nickname')
    //             }
    //         });
    //     }
    // };

    const sendMessage = (e:any) => {
        e.preventDefault();
        Helpers.Discussion.sendMessage(user.id.toString(), target.toString(), content).then((res) => {
            console.log('message sent', res);
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
                    Helpers.Discussion.getMessage(resz[0]?.id.toString()).then((resp) => {
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
        Helpers.Discussion.getMessage(e.target.value.toString()).then((res) => {
            setMessage(res!);
        });
    };

    const handleChange = (e:any) => {
        e.preventDefault();
        setContent(e.target.value);
    };

    // socket.on(location?.state?.chat_id, (data: { content: string, nickname: string, chat_id: string }) => {
    //     const output = [...allMessage, {
    //         nickname: data?.nickname,
    //         content: data?.content
    //     }];
    //     setAllMessage(output);
    // });

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
                            {messages.map((message) => (
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
            </Box>
        </>
    );
};

export default DiscussionPanel;