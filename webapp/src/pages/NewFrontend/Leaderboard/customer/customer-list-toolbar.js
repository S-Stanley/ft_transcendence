import {
    Box,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from './search';

export const CustomerListToolbar = (props) => (
    <Box {...props}>
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
            }}
        >
            <Typography
                sx={{ m: 1 }}
                variant="h4"
            >
                Leaderboard
            </Typography>
            <Box sx={{ m: 1 }}>
                {/* <Button
                    startIcon={(<UploadIcon fontSize="small" />)}
                    sx={{ mr: 1 }}
                >
                    Import
                </Button>
                <Button
                    startIcon={(<DownloadIcon fontSize="small" />)}
                    sx={{ mr: 1 }}
                >
                    Export
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                >
                    Add Customers
                </Button> */}
            </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
            <Card>
                <CardContent>
                    <Box sx={{ maxWidth: 500 }}>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SvgIcon
                                            color="action"
                                            fontSize="small"
                                        >
                                            <SearchIcon />
                                        </SvgIcon>
                                    </InputAdornment>
                                )
                            }}
                            placeholder="Search player"
                            variant="outlined"
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    </Box>
);
