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