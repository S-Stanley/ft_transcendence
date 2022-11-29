import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Card,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';

export const CustomerListResults = ({ customers, ...rest }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Username
                                </TableCell>
                                <TableCell>
                                    Ratio
                                </TableCell>
                                <TableCell>
                                    Last Connection
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.slice(0, limit).map((customer) => (
                                <TableRow
                                    hover
                                    key={customer.id}
                                >
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar
                                                src={customer.avatarUrl}
                                                sx={{ mr: 2 }}
                                            >
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {customer.username}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {`${customer.ratio}`}
                                    </TableCell>
                                    <TableCell>
                                        {format(customer.lastConnection, 'dd/MM/yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        {customer.email}
                                    </TableCell>
                                    <TableCell>
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    >
                                        Add Friend
                                    </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={customers.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

CustomerListResults.propTypes = {
    customers: PropTypes.array.isRequired
};
