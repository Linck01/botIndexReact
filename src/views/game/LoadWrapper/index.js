import React, { createContext, useEffect, useReducer } from 'react';

import GameContext from '../../../contexts/GameContext';
import Loader from '../../../ui-component/Loader';
/*
import { useParams } from 'react-router-dom';

// project imports
import axios from '../utils/axios';
import Loader from '../ui-component/Loader';
import config from '../config';
import fct from '../utils/fct.js';
*/


//-----------------------|| JWT CONTEXT & PROVIDER ||-----------------------//


export const GameLoadWrapper = ({ children }) => {
    const { game } = React.useContext(GameContext);

    useEffect(() => {
       
    }, []);

    if (!game) 
        return <Loader />;
    
    return <>{children}</>;
};

export default GameLoadWrapper;


