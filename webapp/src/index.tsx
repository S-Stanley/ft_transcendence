import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './global.scss';

import NewLeaderboard from './pages/NewFrontend/Leaderboard';
import NewPlay from './pages/NewFrontend/Play';
import NewHome from "./pages/NewFrontend/Home";
import NewUser from "./pages/NewFrontend/User";
import NewStatistics from './pages/NewFrontend/Statistics';

import MenuComponent from './components/menu';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Messagerie from './pages/messagerie/Messagerie';
import Chat from './pages/chat/Chat';
import EmailLogin from './pages/Login/EmailLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                <Route path='/home' element={<Home/>} />
                <Route path='/home/messagerie' element={<Messagerie/>} />
                <Route path='/home/messagerie/chat' element={<Chat/>} />
                <Route path='/oauth2-redirect' element={<Login/>} />
                <Route path='/login/email' element={<EmailLogin/>} />

                <Route path="new/home" element={<NewHome />} />
                <Route path="new/play" element={<NewPlay />} />
                <Route path="new/user" element={<NewUser />} />
                <Route path="new/leaderboard" element={<NewLeaderboard />} />
                <Route path="new/statistics" element={<NewStatistics />} />

            </Routes>
        </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
