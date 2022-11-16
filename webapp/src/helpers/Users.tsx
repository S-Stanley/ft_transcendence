import Config from "../config/Config"
import axios from 'axios';
import { User } from "../interfaces/user";

const login = async(code: string): Promise<{token: string} | null> => {
    try {
        const res = await axios.post(`${Config.Api.url}/users/auth`, {
            code: code
        });
        if (res.data.token != undefined)
        {
            return (res.data);
        }
        else
        {
            return (null);
        }
    } catch (e) {
        console.error(e);
        return (null);
    }
}

const me = async(): Promise<User | null> => {
    return await axios.get(`${Config.Api.url}/users/me`).then((res) => res.data);
}

export default {
    login,
    me
}