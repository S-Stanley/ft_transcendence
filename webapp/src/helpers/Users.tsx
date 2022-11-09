import Config from "../config/Config"
import axios from 'axios';

const login = async(email: string, password: string): Promise<{email: string, user_id:string, token: string} | null> => {
    try {
        const req = await axios.post(`${Config.Api.url}/users/auth/login`, {
            email: email,
            password: password
        });
        return (req.data);
    } catch (e) {
        console.error(e);
        alert('Wrong email or wrong password');
        return (null);
    }
}

export default {
    login,
}