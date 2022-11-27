import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';


export const Pongs = (props) => (
    <Card {...props} sx={{ height: '100%' }} variant="outlined">
        <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        NUMBER PONGS
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        {props.pongs}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: '#E4E70A',
                            height: 56,
                            width: 56
                        }}
                    >
                        <AirlineStopsIcon />
                    </Avatar>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
