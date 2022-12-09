// import { Button } from "@mui/material";
// import { Box, Container, Grid, Paper } from "@mui/material";
import { Avatar, Container, Grid, Paper } from "@mui/material";
import { MatchHistory } from "./components/match-history";
import Copyright from "../Utils/Copyright";
import Choose from "./components/Choose";
import Connected from "./components/Connected";
import axios from "axios";
import Config from "../../config/Config";
import { useState } from "react";
// import Helpers from "../../helpers/Helpers";
// import { useEffect, useState } from "react";
// import { CardMedia } from '@mui/material';
// import Helpers from "../../helpers/Helpers";

const Welcome = () => {

    const [test, setTest] = useState<string>('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        file.originalname = 'ouechlamiff';
        console.log('uncoming file', file);
        try {
            const req = await axios.post(`${Config.Api.url}/users/picture`, {
                file,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            // Helpers.saveProfilePicture('http://localhost:5000/')
            // http://localhost:5000/coucou.jpeg
            console.log('response from post', req.data.file);
            const path = "./../../../../api/" + req.data.file.path;
            setTest(path);
            console.log('string is ', path);
            console.log(test);
        } catch (e) {
            console.error(e);
            return (null);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 220,
                        }}
                    >
                        <Choose />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 220,
                        }}
                    >
                        <Connected />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <MatchHistory  />
                    </Paper>
                </Grid>
            </Grid>
            <br></br>
            <Copyright />
            <div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label>Upload File:</label>
                    <input type="file" name="picture" accept="image/*"/>
                    <button type="submit">Upload</button>
                </form>
            </div>
            <Avatar src='http://localhost:5000/coucou.jpeg'>
                coucou
            </Avatar>
        </Container>
    );
};

export default Welcome;