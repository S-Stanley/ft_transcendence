import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './global.scss';

import Login from './pages/Login/Login';
import EmailLogin from './pages/Login/EmailLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Game from './pages/Pong/Game';
import { Play } from './pages/Play';
import Account from './pages/User/Account';
import Profile from './pages/Profile/Profile';
import Messaging from './pages/messagerie/Messagerie';
import Home from './pages/Home/Home';
import Chat from './pages/chat/Chat';
import Matchmaking from './pages/Matchmaking/Matchmaking';
import Online from './pages/Online/Online';
import TwoFactorAuth from './pages/TwoFactor/TwoFactorAuth';
import TwoFactorSetUp from './pages/TwoFactor/TwoFactorSetUp';
import FriendSearch from './pages/Friends/FriendSearch';


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
            <Route path='/2fa' element={<TwoFactorAuth/>} />
            <Route path='/2fa/setup' element={<TwoFactorSetUp/>} />
            <Route path='/login' element={<EmailLogin/>} />
            <Route path='/oauth2-redirect' element={<Login/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/messagerie' element={<Messaging/>} />
            <Route path='/chat' element={<Chat/>} />
            <Route path="/play" element={<Play />} />
            <Route path="/play/pong" element={<Game />} />
            <Route path="/play/online" element={<Online />} />
            <Route path="/user" element={<Account />} />
            <Route path='/users/:nickname' element={<Profile/>} />
            <Route path="/friends" element={<FriendSearch />} />
            <Route path="/login/email" element={<EmailLogin />} />
            <Route path="/play/matchmaking" element={<Matchmaking/>}/>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
