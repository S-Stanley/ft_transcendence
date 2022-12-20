import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';

export const NeverAlone = (props) => (
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
                        You'll never be lone
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
                            <Diversity3Icon />
                        </Avatar>
                        :
                        <Avatar
                            sx={{
                                backgroundColor: 'text.disabled',
                                height: 56,
                                width: 56
                            }}
                        >
                            <Diversity3Icon />
                        </Avatar>
                    }
                </Grid>
                <Grid item>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="overline"
                    >
                        Send a friend request (not checked)
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
