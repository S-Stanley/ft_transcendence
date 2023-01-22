import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Button, Card, CardHeader, Table, TableBody, TableCell, TableHead, TableRow, } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from './severity-pill';
import { useEffect, useState } from 'react';
import Helpers from '../../../helpers/Helpers';

export const MatchHistory = (props:any) => {

    const [values, setValues] = useState([]);

    const getHistory = async () => {
        try{
            const res = await Helpers.History.get_match();
            setValues(res.data.result.reverse());
        } catch (e) {}
    };

    useEffect(() => {getHistory();}, []);

    return (
        <Card {...props}>
            <CardHeader />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                Opponent
                                </TableCell>
                                <TableCell>
                                Score
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values.map((value:any) => (
                                <TableRow
                                    hover
                                    key={value.id}
                                >
                                    <TableCell>
                                        {value.opp_name}
                                    </TableCell>
                                    <TableCell>
                                        <SeverityPill
                                            color={
                                                ((value.player_score > 1) && 'success')
                                            || ((value.player_score <= 1) && 'error')
                                            || 'secondary'}
                                        >
                                            {value.player_score == 2 ? 'WIN' : 'LOSE'}
                                        </SeverityPill>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                    variant="text"
                >
                View all
                </Button>
            </Box>
        </Card>

    );};
