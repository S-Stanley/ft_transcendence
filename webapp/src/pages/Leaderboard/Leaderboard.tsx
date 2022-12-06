import { Box, Container } from '@mui/material';
import { mdTheme } from '../Utils/Dashboard';
import NewAppBar from '../Utils/NewAppBar';
import { CustomerListResults } from './customer/customer-list-results';
import { CustomerListToolbar } from './customer/customer-list-toolbar';
import { customers } from './customer/customers';

const Leaderboard = () => (
    <>
        <NewAppBar/>
        <Box
            component="main" position="fixed"
            sx={{
                top:'100px',
                left:'300px',
                backgroundColor: mdTheme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <CustomerListToolbar />
                    <Box sx={{ mt: 3 }}>
                        <CustomerListResults customers={customers} />
                    </Box>
                </Container>
            </Box>
        </Box>
    </>
);

export default Leaderboard;