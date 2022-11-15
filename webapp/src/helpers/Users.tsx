import Config from "../config/Config"
import axios from 'axios';

const login = async(code: string): Promise<{token: string} | null> => {
    try {
        const res = await axios.post(`${Config.Api.url}/users/auth`, {
            code: code
        });
        if (res.data.access_token != undefined)
            return (res.data.access_token);
        else
            return (null);
    } catch (e) {
        console.error(e);
        alert('Erreur authentification');
        return (null);
    }
}

const findUserByEmail = async(email: string): Promise<{email: string, user_id: string} | null> => {
    try {
        const req = await axios.get(`${Config.Api.url}/users/${email}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        return (req.data);
    } catch (e) {
        console.error(e);
        alert('User not found');
        return (null);
    }
}

export default {
    login,
    findUserByEmail
}