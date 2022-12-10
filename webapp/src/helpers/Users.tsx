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

const changeUserData = async (email:string, nickname:string): Promise<User | null | undefined> => {
    try {
        const res = await axios.get(`${Config.Api.url}/users/me`);
        const req = await axios.post(`${Config.Api.url}/users/update`, {
            email: email,
            nickname: nickname,
            id_42: res.data.id_42,
        });
        if (req.data.row[0])
            return (req.data.rows[0]);
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

<<<<<<< HEAD
<<<<<<< HEAD
const addFriend = async(friend: string, nickname: string): Promise<any> => {
    try {
        const res = await axios.post(`${Config.Api.url}/users/add/${friend}`, {
            nickname: nickname
        });
=======
const getAllUsers = async(): Promise<any> => {
    try {
        const res = await axios.get(`${Config.Api.url}/users/all`);
>>>>>>> 1719295 (feat(webapp): search friends, go to profile page and add)
=======
const getAllUsers = async(): Promise<any> => {
    try {
        const res = await axios.get(`${Config.Api.url}/users/all`);
>>>>>>> 1719295594b6a7bd37776834cedfaf67b1ba4ed8
        return (res.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

<<<<<<< HEAD
<<<<<<< HEAD
const checkNickname = async (nickname:string): Promise<boolean | undefined> => {
    try {
        const req = await axios.post(`${Config.Api.url}/users/checkNickname`, {
            nickname: nickname,
        });
        if (req.data === true)
            return (true);
        return (false);
    } catch (e) {
        console.error(e);
        return (false);
    }
};

const checkEmail = async (email:string): Promise<boolean | undefined> => {
    try {
        const req = await axios.post(`${Config.Api.url}/users/checkEmail`, {
            email: email,
        });
        if (req.data === true)
            return (true);
        return (false);
    } catch (e) {
        console.error(e);
        return (false);
    }
};

=======
>>>>>>> 1719295 (feat(webapp): search friends, go to profile page and add)
=======
>>>>>>> 1719295594b6a7bd37776834cedfaf67b1ba4ed8
const Users = {
    login,
    me,
    findUserByEmail,
    login_with_email,
    getUser,
    updateStatus,
<<<<<<< HEAD
<<<<<<< HEAD
    addFriend,
    changeUserData,
    checkNickname,
    checkEmail,
=======
    getAllUsers,
>>>>>>> 1719295 (feat(webapp): search friends, go to profile page and add)
=======
    getAllUsers,
>>>>>>> 1719295594b6a7bd37776834cedfaf67b1ba4ed8
};

export default Users;