import { Container, Grid, Paper } from "@mui/material"
import { MatchHistory } from "./components/match-history"
import Copyright from "../Utils/Copyright"
import Choose from "./components/Choose"
import Connected from "./components/Connected"

const Welcome = () => (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 220,
          }}
        >
          <Choose />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 220,
          }}
        >
          <Connected />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <MatchHistory  />
        </Paper>
      </Grid>
    </Grid>
    <br></br>
    <Copyright />
  </Container>
)

export default Welcome