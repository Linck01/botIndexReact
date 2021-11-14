import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from '../../utils/axios';
import config from '../../config';
import useAuth from '../../hooks/useAuth';
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
import GameChat from './GameChat';
import { GameProvider } from '../../contexts/GameContext';
import GameContext from '../../contexts/GameContext';

//==============================|| SAMPLE PAGE ||==============================//



const SamplePage = () => {
    //let { id } = useParams();
    //const [isLoading, setIsLoading] = useState(true);
    const { game }  = useContext(GameContext);
    // toggle sidebar
    const [openChatDrawer, setOpenChatDrawer] = React.useState(true);

    const handleChatDrawerOpen = () => {
        console.log('handleDrawerOpen');
        setOpenChatDrawer((prevState) => !prevState);
    };
    
    //const [game, setGame] = useState({});
    //const [socket, setSocket] = useState();

    /*const initGameAndWebSocket = async () => {
        setIsLoading(true);
        const response = await axios.get(config.apiHost + '/v1/games/' + id);
        await fct.sleep(1000);

        if (process.env.NODE_ENV != 'production') 
            response.data.server = 'localhost:3005';

        setGame(response.data);
        setIsLoading(false);

        console.log(socket);
        if (!socket) {
            setSocket(io(response.data.server,{ transports: ['websocket','polling']}));
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
            <Grid container spacing={gridSpacing}>
                <Grid item lg={openChatDrawer ? 8 : 12} xs={12}>
                    <GameTabs handleChatDrawerOpen={handleChatDrawerOpen}></GameTabs>
                </Grid>
                { openChatDrawer ? (
                    <Grid item lg={4} xs={12}>
                        <GameChat handleChatDrawerOpen={handleChatDrawerOpen} openChatDrawer={openChatDrawer}></GameChat>
                    </Grid>
                ) : '' };

            </Grid>
        </GameProvider>
    );
};

export default SamplePage;
