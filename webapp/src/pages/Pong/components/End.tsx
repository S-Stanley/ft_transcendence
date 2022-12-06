import { Button, Typography } from "@mui/material";
import React from "react";

export const End = ( props: { scoreOne: number; scoreTwo: number } ) => {

    return (
        <React.Fragment>
            <br></br>
            <br></br>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                sx={{ ml:'620px', }}
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
                sx={{ ml:'600px', }}
                href='/play'
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