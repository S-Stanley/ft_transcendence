import Config from "../config/Config";
import axios from 'axios';
import { MatchmakingRequest } from "../interfaces/mathmaking";

const matchRequest = async (id_42:number): Promise<MatchmakingRequest | null> => {
    try {
        const res = await axios.post(`${Config.Api.url}/matchmaking/add`, {
            id_42: id_42,
        });
        return (res.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const getRequests = async (): Promise<any> => {
    try {
        const res = await axios.get(`${Config.Api.url}/matchmaking/requests`);
        return (res.data);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const matchCancel = async (id_42:number): Promise<null> => {
    try {
        await axios.post(`${Config.Api.url}/matchmaking/cancel`, {
            id_42: id_42,
        });
        return (null);
    } catch (e) {
        console.error(e);
        return (null);
    }
};

const Matchmaking = {
    matchRequest,
    getRequests,
    matchCancel,
};

export default Matchmaking;
