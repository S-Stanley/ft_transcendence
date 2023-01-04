import Config from "../config/Config";
import axios from 'axios';
import { MessagerieInterface } from "../interfaces/messagerie";

const create_or_get_discussion = async (email: string) => {
    try {
        const req = await axios.post(`${Config.Api.url}/chat/`, {
            email: email,
            from: localStorage.getItem('email')
        }, {
            headers: {
                token: localStorage.getItem('token'),
            }
        });
        return (req.data);
    } catch (e) {
        console.error(e);
    }
};

const send_message_to_discussion = async (chat_id: string, content: string) => {
    try {
        const req = await axios.post(`${Config.Api.url}/chat/send`, {
            chat_id: chat_id,
            sender_id: localStorage.getItem('user_id'),
            content: content,
        });
        return (req.data);
    } catch (e) {
        console.error(e);
    }
};

const get_message_of_discussion = async (chat_id: string) => {
    try {
        const req = await axios.get(`${Config.Api.url}/chat/${chat_id}`, {
            headers: {
                token: localStorage.getItem('token'),
            }
        });
        return (req.data);
    } catch (e) {
        console.error(e);
    }
};

const   get_all_chat_by_user_id = async (user_id: string): Promise<MessagerieInterface[]> => {
    try {
        const req = await axios.get(`${Config.Api.url}/chat/all/${user_id}`);
        return (req.data);
    } catch (e) {
        console.error(e);
        return ([]);
    }
};

const   create_new_public_chat = async (
    chat_name: string,
    user_id: string
): Promise<MessagerieInterface | null> => {
    try {
        const req = await axios.put(`${Config.Api.url}/chat/`, {
            chat_name: chat_name,
            user_id: user_id,
        });
        return (req.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const Messagerie = {
    create_or_get_discussion,
    send_message_to_discussion,
    get_message_of_discussion,
    get_all_chat_by_user_id,
    create_new_public_chat,
};

export default Messagerie;
