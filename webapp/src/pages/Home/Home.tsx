import { Fragment } from "react"

import Pong from "../../components/Pong/pong";

import './Home.scss'

const Home = () => {
    return (
        <Fragment>
            <p data-testid='home-page-title'>Home</p>
            <Pong/>
        </Fragment>
    )
};

export default Home;