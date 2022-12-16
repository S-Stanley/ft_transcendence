import Config from "../config/Config";
import axios from 'axios';
import { DiscussionInterface } from '../interfaces/discussion';

const   getConversations = async (id_42: string | undefined): Promise<DiscussionInterface[]> => {
    try {
        const req = await axios.get(`${Config.Api.url}/discussion/all/${id_42}`);
        return (req.data);
    } catch (e) {
        console.error(e);
        return ([]);
    }
};

const Discussion = {
    getConversations,
};

export default Discussion;