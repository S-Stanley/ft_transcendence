import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

export const IAmVeteran = (props) => (
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
                        I am veteran
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
                            <MilitaryTechIcon />
                        </Avatar>
                        :
                        <Avatar
                            sx={{
                                backgroundColor: 'text.disabled',
                                height: 56,
                                width: 56
                            }}
                        >
                            <MilitaryTechIcon />
                        </Avatar>
                    }
                </Grid>
                <Grid item>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="overline"
                    >
                        Play 5 games
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
