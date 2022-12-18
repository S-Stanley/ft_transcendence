import Config from "../config/Config";
import axios from 'axios';

const   getConversations = async (user_id: string | undefined): Promise<any> => {
    try {
        const req = await axios.get(`${Config.Api.url}/discussion/all/${user_id}`);
        return (req.data);
    } catch (e) {
        console.error(e);
        return ([]);
    }
};

const   getMessage = async (user_id: number | undefined, me: number | undefined): Promise<any> => {
    try {
        const req = await axios.get(`${Config.Api.url}/discussion/message/${me?.toString()}`);
        let target = 0;
        if (typeof(user_id) === 'string')
            target = parseInt(user_id);
        else if (user_id !== undefined)
            target = user_id;
        const res = req.data.filter((value:any) => value.sender === target || value.sender === me);
        console.log('the filter result is: ', res);
        return (res);
    } catch (e) {
        console.error(e);
        return ([]);
    }
};

const sendMessage = async (user_id: string, target_id: string, content: string): Promise<any> => {
    try {
        const req = await axios.post(`${Config.Api.url}/discussion/message/${user_id}`, {
            target_id: target_id,
            content: content,
        });
        return (req.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const createConversation = async (user_id: number, username: string): Promise<any> => {
    try {
        const req = await axios.post(`${Config.Api.url}/discussion/create_conversation`, {
            user_id: user_id,
            username: username,
        });
        return (req.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};


const Discussion = {
    getConversations,
    getMessage,
    sendMessage,
    createConversation,
};

export default Discussion;