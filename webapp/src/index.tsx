import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './global.scss';

import Leaderboard from './pages/Leaderboard';
import Home from "./pages/Home";
import User from "./pages/User";
import Statistics from './pages/Statistics';
import Login from './pages/Login/Login';
import Messaging from './pages/messagerie';
import Chat from './pages/chat';
import EmailLogin from './pages/Login/EmailLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuComponent from './components/menu';
import Game from './pages/Pong/Game';
import { Play } from './pages/Play';


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
        <MenuComponent/>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/login' element={<EmailLogin/>} />
            <Route path='/oauth2-redirect' element={<Login/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/messagerie' element={<Messaging/>} />
            <Route path='/chat' element={<Chat/>} />
            <Route path="/play" element={<Play />} />
            <Route path="/play/pong" element={<Game />} />
            <Route path="/user" element={<User />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/statistics" element={<Statistics />} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
