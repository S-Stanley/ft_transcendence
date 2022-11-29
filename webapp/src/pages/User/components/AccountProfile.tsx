import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import { useState } from 'react';

export const AccountProfile = (props:any) => {

    const [values, setValues] = useState({
        avatar: '',
        username: '',
    });

return (
    <Card {...props}>
        <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Avatar
                    src={values.avatar}
                    sx={{
                        height: 64,
                        mb: 2,
                        width: 64
                    }}
                />
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {values.username}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {`mettre bio`}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {'& autres infos'}
                </Typography>
            </Box>
        </CardContent>
        <Divider />
        <CardActions>
            <Button
                color="primary"
                fullWidth
                variant="text"
            >
                Upload picture
            </Button>
        </CardActions>
    </Card>

)};
