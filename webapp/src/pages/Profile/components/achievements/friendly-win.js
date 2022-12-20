import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';

export const FriendlyWin = (props) => (
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
                        No hard feelings
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
                            <SportsKabaddiIcon />
                        </Avatar>
                        :
                        <Avatar
                            sx={{
                                backgroundColor: 'text.disabled',
                                height: 56,
                                width: 56
                            }}
                        >
                            <SportsKabaddiIcon />
                        </Avatar>
                    }
                </Grid>
                <Grid item>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="overline"
                    >
                        Win a game against a friend (not checked)
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
