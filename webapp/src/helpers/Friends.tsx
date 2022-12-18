import axios from "axios";
import Config from "../config/Config";

const sendFriendRequest = async(friend: string, nickname: string): Promise<any> => {
    try {
        const res = await axios.post(`${Config.Api.url}/friends/sendrequest/${friend}`, {
            nickname: nickname
        });
        return (res.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const getReceivedFriendRequests = async(): Promise<any> => {
    return await axios.get(`${Config.Api.url}/friends/requests`).then((res) => res.data);
};

const getFriendRequestStatus = async(otherUser: string): Promise<any> => {
    return await axios.get(`${Config.Api.url}/friends/requests/${otherUser}`).then((res) => res.data);
};

const acceptFriendRequest = async(otherUser: string, nickname: string, accept: boolean): Promise<any> => {
    try {
        const res = await axios.post(`${Config.Api.url}/friends/requests/${otherUser}/accept`, {
            nickname: nickname,
            accept: accept
        });
        return (res.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const Friends = {
    sendFriendRequest,
    getReceivedFriendRequests,
    getFriendRequestStatus,
    acceptFriendRequest,
};

export default Friends;