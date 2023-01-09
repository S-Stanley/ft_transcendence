import { Avatar, Button, Card, IconButton, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Helpers from '../../../helpers/Helpers';
import ClearIcon from '@mui/icons-material/Clear';

export const FriendRequestsSent = ({requests}) => {
    // const [, forceUpdate] = useReducer(x => x + 1, 0);
    return (requests.length === 0 ?
        <Card>
            <Box>
                <Table  >
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    color="textPrimary"
                                    variant="body1"
                                >
                                    No requests sent...
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </Card>
        :
        <Card>
            <PerfectScrollbar>
                <Box>
                    <Table>
                        <TableBody>
                            {requests.map((req) => (
                                <TableRow key={req.id ? req.id : 'def'}>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar
                                                src={req.avatar}
                                                sx={{ mr: 2 }}
                                            >
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {req.nickname}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button sx={{mr: 55}}
                                            size="small"
                                            color="secondary"
                                            variant="outlined"
                                        >
                                        View Profile
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton sx={{ml: 2}} onClick={() => {
                                            Helpers.Friends.acceptFriendRequest(localStorage.getItem('nickname'), req.nickname, false);
                                        }}>
                                            <ClearIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    );
};