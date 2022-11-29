import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfileDetails } from './components/AccountDetails';
import { AccountProfile } from './components/AccountProfile';

const Account = () => (
		<>
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 8
			}}>
			<AccountProfile />
		</Box>

			<AccountProfileDetails />



			{/* <Box
				component="main"
				// sx={{
				// 	flexGrow: 1,
				// 	py: 8
				// }}
			>
				<Container maxWidth="lg">
					<Typography
						sx={{ mb: 3 }}
						variant="h4"
					>
						Mighty Pong Account
					</Typography>
					<Grid
						container
						// spacing={3}
					>
						<Grid
							item
							lg={4}
							md={6}
							xs={12}
						>
						<AccountProfile />
						</Grid>
					</Grid>
				</Container>
						<Grid
							item
							lg={8}
							md={6}
							xs={12}
							sx={{
								ml:'100px'
							}}
						>
						<AccountProfileDetails />
						</Grid>
			</Box> */}
		</>
	);

export default Account;