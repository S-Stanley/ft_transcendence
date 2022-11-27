import { format } from 'date-fns';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from './severity-pill';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const MatchHistory = (props) => {

    const [values, setValues] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:3333/users/history')
        .then(response => {
        setValues(response.data.reverse())
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
  
  return (
  <Card {...props}>
    {/* <CardHeader title="Match History" /> */}
    <CardHeader />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Date
              </TableCell>
              <TableCell>
                Mode
              </TableCell>
              <TableCell>
                Opponent
              </TableCell>
              <TableCell>
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((value) => (
              <TableRow
                hover
                key={value.id}
              >
                <TableCell>
                {format(Date.parse(value.createdAt), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                {value.mode}
                </TableCell>
                <TableCell>
                {value.opponent}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      ((value.my_score > value.opp_score) && 'success')
                      || ((value.my_score < value.opp_score) && 'error')
                      || 'secondary'}
                  >
                    {value.my_score.toString() + " - " + value.opp_score.toString()}
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
  
)};
