import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

export const Default = (props) => (
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
            DEFAULT
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            ...
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: ' #839192',
              height: 56,
              width: 56
            }}
          >
            <DisabledByDefaultIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
