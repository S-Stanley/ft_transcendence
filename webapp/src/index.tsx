import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import './global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { mdTheme } from './pages/Utils/Dashboard';
import Profile from './pages/Profile/Profile';
import EmailLogin from './pages/Login/EmailLogin';
import Messaging from './pages/Messaging/Messaging';
import ChatBar from './pages/chat/Chat';
import { Play } from './pages/Play/Play';
import Game from './pages/Pong/Game';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import User from './pages/User/User';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

axios.interceptors.request.use((config) => {
    if (window.localStorage.getItem('token')) {
        if (config.headers) {
            config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token');
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

root.render(
    <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
            <BrowserRouter>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnHover
                    theme="light"
                />
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/login' element={<EmailLogin/>} />
                    <Route path='/oauth2-redirect' element={<Login/>} />
                    <Route path='/home' element={<Home/>} />
                    <Route path='/messagerie' element={<Messaging/>} />
                    <Route path='/chat' element={<ChatBar/>} />
                    <Route path="/play" element={<Play />} />
                    <Route path="/play/pong" element={<Game />} />
                    <Route path="/user" element={<User />} />
                    <Route path='/users/:nickname' element={<Profile/>} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/login/email" element={<EmailLogin />} />
                </Routes>
            </BrowserRouter>
        </Box>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
