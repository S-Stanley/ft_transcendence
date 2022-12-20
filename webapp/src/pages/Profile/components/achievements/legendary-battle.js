import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';

export const LegendaryBattle = (props) => (
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
                        Legendary Battle
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
                            <AirlineStopsIcon />
                        </Avatar>
                        :
                        <Avatar
                            sx={{
                                backgroundColor: 'text.disabled',
                                height: 56,
                                width: 56
                            }}
                        >
                            <AirlineStopsIcon />
                        </Avatar>
                    }
                </Grid>
                <Grid item>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="overline"
                    >
                        Win a game with 10 pongs
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
