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

const addFriend = async(friend: string, nickname: string): Promise<any> => {
    try {
        const res = await axios.post(`${Config.Api.url}/users/add/${friend}`, {
            nickname: nickname
        });
        return (res.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

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

const uploadPicture = async (file:any): Promise<any> => {
    const res = await axios.post(`${Config.Api.url}/users/picture`, {
        file,
    }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return (res);
};

const saveProfilePicture = async (avatar:string, id_42:number): Promise<User | null> => {
    try {
        const req = await axios.post(`${Config.Api.url}/users/update_picture`, {
            avatar: avatar,
            id_42: id_42,
        });
        return (req.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const toggleTwoFactor = async (twoFactor: boolean, id_42:number): Promise<User | null> => {
    try {
        const req = await axios.post(`${Config.Api.url}/users/toggle_two_factor`, {
            twoFactor: twoFactor,
            id_42: id_42,
        });
        return (req.data);
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
    addFriend,
    changeUserData,
    checkNickname,
    checkEmail,
    uploadPicture,
    saveProfilePicture,
    toggleTwoFactor,
};

export default Users;