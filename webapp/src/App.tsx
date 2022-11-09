import React, { useState } from 'react';
import Helpers from './helpers/Helpers';

function App() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e: { preventDefault: any }): Promise<void> => {
        e.preventDefault();

        const req = await Helpers.Users.login(email, password);
        if (req){
            setEmail('');
            setPassword('');
            localStorage.setItem('token', req.token);
            alert('You are now connected!');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" autoComplete="username" />
          <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"  autoComplete="current-password" />
          <br />
          <button type="submit">Valider</button>
        </form>
    );
}

export default App;
