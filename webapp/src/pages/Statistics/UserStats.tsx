import { Box, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Loses } from './components/lost';
import { MatchHistory } from './components/match-history';
import { Ratio } from './components/ratio';
import { Pongs } from './components/pongs';
import { Wins } from './components/won'
import { Default } from './components/default';
import { Scored } from './components/scored';
import { Taken } from './components/taken';
				
const UserStats = () => {
					
		const [values, setValues] = useState({
				numberPongs: '24',
				matchWon: '13', 
				matchLost: '8', 
				goalsScored: '46',
				goalsTaken: '34', 
		});

		return (
			<>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						py: 8
					}}
				>
					<Container maxWidth={false}>
					<Typography
						sx={{ mb: 3 }}
						variant="h4"
					>
						Statistics
					</Typography>		
						<Grid
							container
							spacing={3}
						>
						 <Grid
								item
								xl={3}
								lg={3}
								sm={6}
								xs={12}
							>
								<Ratio win={values.matchWon} lose={values.matchLost} />
							</Grid>
							<Grid
								item
								xl={3}
								lg={3}
								sm={6}
								xs={12}
							>
								<Wins wins={values.matchWon} />
							</Grid>
							<Grid
								item
								lg={3}
								sm={6}
								xl={3}
								xs={12}
							>
								<Loses loses={values.matchLost} />
							</Grid>
							<Grid
								item
								xl={3}
								lg={3}
								sm={6}
								xs={12}
							>
								<Default sx={{ height: '100%' }} />
							</Grid>
								<Grid
										item
										lg={3}
										sm={6}
										xl={3}
										xs={12}
								>
										<Pongs pongs={values.numberPongs} sx={{ height: '100%' }} />
								</Grid>
								<Grid
										item
										xl={3}
										lg={3}
										sm={6}
										xs={12}
								>
										<Scored goalScored={values.goalsScored} />
								</Grid>
								<Grid
										item
										xl={3}
										lg={3}
										sm={6}
										xs={12}
								>
										<Taken goalsTaken={values.goalsTaken} />
								</Grid>
								<Grid
										item
										xl={3}
										lg={3}
										sm={6}
										xs={12}
								>
										<Default sx={{ height: '100%' }} />
								</Grid>
						</Grid>
								<MatchHistory	/>
					</Container>
				</Box>
			</>
		);
}

export default UserStats