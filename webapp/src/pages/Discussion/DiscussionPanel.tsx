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

    useEffect(() => {
        Helpers.Users.me().then((res) => {
            setUser(res!);
            Helpers.Discussion.getConversations(res?.id.toString()).then((resz) => {
                setDiscussions(resz!);
                console.log('conversation fetch', resz);
                if (resz[0] !== null)
                {
                    console.log('the id passed in argument is', resz[0].id);
                    Helpers.Discussion.getMessage(resz[0]?.id.toString()).then((resp) => {
                        setMessage(resp!);
                        console.log('message fetch', resp);
                    });
                }
            });
            console.log('me fetch', res);
        });
    }, []);

    const display_conversation = (e: any) => {
        Helpers.Discussion.getMessage(e.target.value.toString()).then((res) => {
            setMessage(res!);
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
                                <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                            </Grid>
                            <Grid xs={1}>
                                <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default DiscussionPanel;