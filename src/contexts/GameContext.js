import React, { createContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import useAuth from '../hooks/useAuth';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { GAME_INITIALIZE, NEW_MESSAGES, LOAD_BETPAGE, LOAD_MEMBERPAGE } from '../store/actions';
import gameReducer from '../store/gameReducer';

// project imports
import axios from '../utils/axios';
import Loader from '../ui-component/Loader';
import config from '../config';
import fct from '../utils/fct.js';

// constant
const initialState = {
    game: null,
    socket: null,
    amIAdmin: false,
    amIMod: false,
    isInitialized: false,
    chatHistory: [],
    betPage: [],
    betPageIndex: 1,
    memberPage: [],
    memberPageIndex: 1
};



//-----------------------|| JWT CONTEXT & PROVIDER ||-----------------------//

const GameContext = createContext({
    ...initialState,
    addMessages: () => Promise.resolve(),
    setPage: () => Promise.resolve()
});


export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    let { gameId } = useParams();
    const { user } = useAuth();
    console.log('GAMECONTEXT id' + gameId);

    const initGame = async () => {
        try {
            console.log('INITGAME  id' + gameId);
            const response = await axios.get(config.authHost + '/v1/games/' + gameId);
            
            if (process.env.NODE_ENV != 'production') 
                response.data.server = 'localhost:3005';
            await fct.sleep(1000);
            response.data.server = response.data.server;
            return response.data;
        } catch (err) {
            console.error(err);
            return {};
        }
    };

    const initSocket = async (url) => {
        if (!state.socket) {
            const socket = io(url,{ transports: ['websocket','polling']});
            console.log('Connecting to websocket.');

            socket.on('connect', function() {
                socket.emit('room', gameId);
                console.log('Joining room ' + gameId);
            });

            
            
            return socket;
        } else if (!state.socket.connected)
            console.log('Please reconnect to websocket.');

    };
    
    const addMessages = async (messages) => {   
        dispatch({
            type: NEW_MESSAGES,
            messages: messages
        });
    };

    const setBetPage = async (data) => {
        dispatch({
            type: LOAD_BETPAGE,
            betPage: data
        });
    };


    useEffect(() => {
        const init = async () => {
            const game = await initGame();
            const socket = await initSocket(game.server);

            let amIAdmin = false, amIMod = false;
            if (user) {

                if (game.userId == user.id)
                    amIAdmin = true;
                //if (game.moderators.includes(user.id))
                    //amIMod = true;
            }

            dispatch({ type: GAME_INITIALIZE, payload: { game, socket, amIAdmin, amIMod } });
        };

        init();

        return function cleanup() {
            if (state.socket && state.socket.off)
                state.socket.off('chatMessage');
        };
    }, []);

    if (!state.isInitialized) {
        return <Loader />;
    } 

    return <GameContext.Provider value={{ ...state, addMessages, setBetPage }}>{children}</GameContext.Provider>;
};

export default GameContext;


