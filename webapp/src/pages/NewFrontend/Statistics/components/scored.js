import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';


export const Scored = (props) => (
  <Card {...props} variant="outlined" sx={{ height: '100%' }}>
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
            GOALS SCORED
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.goalScored}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <BookmarkAddIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
