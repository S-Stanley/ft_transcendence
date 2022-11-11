import { Fragment, useState } from 'react';
import Helpers from './../helpers/Helpers';
import MenuComponent from './../components/menu';
import { useNavigate } from 'react-router-dom';

function App() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
        e.preventDefault();
        const req = await Helpers.Users.login(email, password);
        if (req){
            setEmail('');
            setPassword('');
            localStorage.setItem('token', req.token);
            navigate('/home');
        }
    }

    return (
        <Fragment>
            <MenuComponent/>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" autoComplete="username" />
                <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"  autoComplete="current-password" />
                <br />
                <button type="submit">Valider</button>
            </form>
        </Fragment>
    );
}

export default App;
