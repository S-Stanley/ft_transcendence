import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';

export const WhatAWinner = (props) => (
    <Card {...props} variant="outlined" sx={{ height: '100%' }}>
        <CardContent>
            <Grid
                container
                spacing={2}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        What a winner
                    </Typography>
                </Grid>
                <Grid item>
                    {props.achieved
                        ?
                        <Avatar
                            sx={{
                                backgroundColor: 'success.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <DiamondIcon />
                        </Avatar>
                        :
                        <Avatar
                            sx={{
                                backgroundColor: 'text.disabled',
                                height: 56,
                                width: 56
                            }}
                        >
                            <DiamondIcon />
                        </Avatar>
                    }
                </Grid>
                <Grid item>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="overline"
                    >
                        Win 2 games
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
