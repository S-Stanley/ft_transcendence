import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

export const Ratio = (props) => (
    <Card
        sx={{ height: '100%' }}
        variant="outlined"
        {...props}
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
                        RATIO WIN/LOSE 
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        {Number((props.win / (props.lose + props.win)) * 100).toFixed(2)}
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
                        <MilitaryTechIcon />
                    </Avatar>
                </Grid>
            </Grid>
            <Box sx={{ pt: 3 }}>
                <LinearProgress
                    value={(props.win / (props.lose + props.win)) * 100}
                    variant="determinate"
                />
            </Box>
        </CardContent>
    </Card>
);
