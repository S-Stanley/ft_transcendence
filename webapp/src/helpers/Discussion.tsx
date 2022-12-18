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

const Discussion = {
    getConversations,
    getMessage,
};

export default Discussion;