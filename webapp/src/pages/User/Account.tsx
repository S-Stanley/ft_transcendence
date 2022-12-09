import { Box } from '@mui/material';
import { AccountProfileDetails } from './components/AccountDetails';
import { AccountProfile } from './components/AccountProfile';
import NewAppBar from '../Utils/NewAppBar';
import { mdTheme } from '../Utils/Dashboard';

const Account = () => (
    <>
        <NewAppBar/>
        <Box
            component="main" position="fixed"
            sx={{
                top:'100px',
                left:'200px',
                right:'200px',
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
                }}>
                <AccountProfile />
            </Box>
            <AccountProfileDetails />
        </Box>
    </>
);

export default Account;