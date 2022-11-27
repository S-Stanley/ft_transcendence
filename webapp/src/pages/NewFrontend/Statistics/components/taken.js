import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

export const Taken = (props) => (
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
            GOALS TAKEN
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.goalsTaken}
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
            <BookmarkRemoveIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
