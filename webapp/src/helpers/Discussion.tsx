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

const   getMessage = async (user_id: string | undefined): Promise<any> => {
    try {
        const req = await axios.get(`${Config.Api.url}/discussion/message/${user_id}`);
        return (req.data);
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

const Discussion = {
    getConversations,
    getMessage,
    sendMessage,
};

export default Discussion;