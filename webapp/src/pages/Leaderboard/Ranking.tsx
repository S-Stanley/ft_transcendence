import { Box, Container } from '@mui/material';
import { CustomerListResults } from './customer/customer-list-results';
import { CustomerListToolbar } from './customer/customer-list-toolbar';
import { customers } from './customer/customers';

const Ranking = () => (
    <>
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
    </>
);

export default Ranking;