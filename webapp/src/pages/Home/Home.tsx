import './Home.scss'
import { Fragment, useState, forwardRef, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const [open, setOpen] = useState(false);
    const { state } = useLocation();

    const isLogged = () => {
        if (state?.logged === true){
            setOpen(true);
        }
    }

    const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    useEffect(() => {
        isLogged();
    });

    return (
        <Fragment>
            <p data-testid='home-page-title'>Home</p>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully logged in!
                </Alert>
            </Snackbar>
        </Fragment>
    )
};
export default Home;