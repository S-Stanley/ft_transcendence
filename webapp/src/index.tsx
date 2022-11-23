import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './global.scss';

import MenuComponent from './components/menu';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Messagerie from './pages/messagerie/Messagerie';
import Chat from './pages/chat/Chat';
import EmailLogin from './pages/Login/EmailLogin';

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
            <MenuComponent/>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/home/messagerie' element={<Messagerie/>} />
                <Route path='/home/messagerie/chat' element={<Chat/>} />
                <Route path='/oauth2-redirect' element={<Login/>} />
                <Route path='/login/email' element={<EmailLogin/>} />
            </Routes>
        </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
