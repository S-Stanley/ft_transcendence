import { Button, Typography } from "@mui/material";
import React from "react";
import Helpers from "../../../helpers/Helpers";
import Cookies from 'universal-cookie';

export const End = ( props: { scoreOne: number; scoreTwo: number } ) => {

    const cookies = new Cookies();

    return (
        <React.Fragment>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                sx={{ ml:'750px', }}
            >
                {
                    props.scoreOne > props.scoreTwo
                        ? `Player one won ${props.scoreOne} against ${props.scoreTwo}`
                        : `Player two won ${props.scoreTwo} against ${props.scoreOne}`
                }
            </Typography>
            <br></br>
            <br></br>
            <Button
                color="secondary"
                variant="contained"
                size="large"
                sx={{ ml:'730px', }}
                href='/play'
                onClick={() => Helpers.Users.updateStatus(cookies.get('nickname')!, 'online')}
            >
				Menu
            </Button>
            <Button
                color="secondary"
                variant="contained"
                size="large"
                sx={{ ml:'100px', }}
                href='/play/pong'
            >
				Again
            </Button>
        </React.Fragment>
    );
};