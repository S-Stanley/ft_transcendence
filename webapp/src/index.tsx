import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './global.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NewAppBar from './pages/Utils/NewAppBar';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');

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
        <NewAppBar/>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
