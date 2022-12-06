import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import SickIcon from '@mui/icons-material/Sick';

export const Loses = (props) => (
    <Card
        sx={{ height: '100%' }}
        {...props}
        variant="outlined"
    >
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
                        MATCH LOST
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        {props.loses}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: 'error.main',
                            height: 56,
                            width: 56
                        }}
                    >
                        <SickIcon />
                    </Avatar>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
