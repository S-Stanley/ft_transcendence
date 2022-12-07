import Config from "../config/Config";
import axios from 'axios';
import { User } from "../interfaces/user";

const login = async(code: string): Promise<User | null> => {
    try {
        const res = await axios.post(`${Config.Api.url}/users/auth`, {
            code: code
        });
        return (res.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const me = async(): Promise<User | null> => {
    return await axios.get(`${Config.Api.url}/users/me`).then((res) => res.data);
};

const getUser = async(nickname: string): Promise<User | null> => {
    return await axios.get(`${Config.Api.url}/users/${nickname}`).then((res) => res.data);
};

const findUserByEmail = async(email: string): Promise<User | null> => {
    try {
        const req = await axios.get(`${Config.Api.url}/users/email/${email}`);
        return (req.data);
    } catch (e) {
        console.error(e);
        alert('User not found');
        return (null);
    }
};

const login_with_email = async(email: string, password: string): Promise<User | null> => {
    try {
        const req = await axios.post(`${Config.Api.url}/users/auth/login`, {
            email: email,
            password: password
        });
        return (req.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const updateStatus = async(nickname: string, current_status: string): Promise<any> => {
    try {
        const res = await axios.post(`${Config.Api.url}/users/status`, {
            nickname: nickname,
            current_status: current_status
        });
        return (res.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const getAllUsers = async(): Promise<any> => {
    try {
        const res = await axios.get(`${Config.Api.url}/users/all`);
        return (res.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const Users = {
    login,
    me,
    findUserByEmail,
    login_with_email,
    getUser,
    updateStatus,
    getAllUsers,
};

export default Users;