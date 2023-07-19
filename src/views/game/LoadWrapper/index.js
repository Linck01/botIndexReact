import React, { useEffect } from 'react';
import config from '../../../config';
import GameContext from '../../../contexts/GameContext';
import Loader from '../../../ui-component/Loader';
import { Helmet } from "react-helmet";

export const GameLoadWrapper = ({ children }) => {
    const { game } = React.useContext(GameContext);

    useEffect(() => {
       
    }, []);

    if (!game) 
        return <Loader />;
    
    return (
    <>
       
        <Helmet>
            <title>{game.title}</title>
            <meta name='description' content={game.desc} />
            <meta name='keywords' content={game.title.split(' ').concat(config.genericKeywords).join(',')} />
        </Helmet>
      
        {children}
    </>);
};

export default GameLoadWrapper;


