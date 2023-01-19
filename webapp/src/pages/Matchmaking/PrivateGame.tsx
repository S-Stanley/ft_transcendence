import { useParams } from 'react-router-dom';

const PrivateGame = () => {
    const { game_id } = useParams();

    return (
        <div>
            This is private game number { game_id }
        </div>
    );
};

export default PrivateGame;