import Config from "../config/Config";
import axios from 'axios';

const add_match = async (player_score: number, player_pongs: number, opp_score: number, opp_name: string) => {
    try {
        const id = await axios.get(`${Config.Api.url}/users/id`);
        const req = await axios.post(`${Config.Api.url}/history/match`, {
            player_id: id.data.user_id,
            player_score: player_score,
            player_pongs: player_pongs,
            opp_score: opp_score,
            opp_name: opp_name,
        });
        return (req.data);
    } catch (e) {
        console.error(e);
    }
};

const get_match = () => (axios.get(`${Config.Api.url}/history/all`));

const History = {
    add_match,
    get_match
};

export default History;