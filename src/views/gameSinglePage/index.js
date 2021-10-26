import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from '../../utils/axios';
import config from '../../config';
import useAuth from '../../hooks/useAuth';
import useGame from '../../hooks/useGame';
import fct from '../../utils/fct.js';
import { useSocketIO, ReadyState } from 'react-use-websocket';
import { useEventSource } from 'react-use-websocket';
import io from 'socket.io-client';

// material-ui
import { Typography, Grid } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
//import BetList from './BetList';
import GameTabs from './GameTabs';
import { GameProvider } from '../../contexts/GameContext';

//==============================|| SAMPLE PAGE ||==============================//



const SamplePage = () => {
    //let { id } = useParams();
    //const [isLoading, setIsLoading] = useState(true);
    const game = useGame();
    //const [game, setGame] = useState({});
    //const [socket, setSocket] = useState();

    /*const initGameAndWebSocket = async () => {
        setIsLoading(true);
        const response = await axios.get(config.apiHost + '/v1/games/' + id);
        await fct.sleep(1000);

        if (process.env.NODE_ENV != 'production') 
            response.data.gameServer = 'localhost:3005';

        setGame(response.data);
        setIsLoading(false);

        console.log(socket);
        if (!socket) {
            setSocket(io(response.data.gameServer,{ transports: ['websocket','polling']}));
            console.log('NEW CONN');
        } else if (!socket.connected)
            console.log('RECONNECT PLS');

        console.log('AAAAAA');
         
    }*/

    useEffect(() => {
        //initGameAndWebSocket() ; 
    }, []);



    return (
        <GameProvider>
            <GameTabs></GameTabs>
        </GameProvider>
    );
};

export default SamplePage;
