import React, { createContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { GAME_INITIALIZE, LOGIN, LOGOUT, REGISTER } from '../store/actions';
import gameReducer from '../store/gameReducer';

// project imports
import axios from '../utils/axios';
import Loader from '../ui-component/Loader';
import config from '../config';

// constant
const initialState = {
    game: null,
    socket: null,
    isInitialized: false
};



//-----------------------|| JWT CONTEXT & PROVIDER ||-----------------------//

const GameContext = createContext({
    ...initialState,
    doSomething: () => Promise.resolve()
});

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    let { id } = useParams();

    const initGame = async () => {
        try {
            const response = await axios.get(config.authHost + '/v1/games/' + id);
            
            if (process.env.NODE_ENV != 'production') 
                response.data.gameServer = 'localhost:3005';

            return response.data;
        } catch (err) {
            console.error(err);
            return {};
        }
    };

    const initSocket = async (gameId, url) => {
        if (!state.socket) {
            const socket = io(url,{ transports: ['websocket','polling']});
            socket.on('connect', function() {
                socket.emit('room', gameId);
            });
            socket.on('message', function(data) {
                console.log('Incoming message:', data);
             });
             
            console.log('New connection to websocket.');
            return socket;
        } else if (!state.socket.connected)
            console.log('Please reconnect to websocket.');

    };

    const doSomething = async (x) => {
        try {
           
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const init = async () => {
            const game = await initGame();
            const socket = await initSocket(game.id,game.gameServer);
            dispatch({ type: GAME_INITIALIZE, payload: { game, socket } });
        };

        init();
    }, []);

    if (!state.isInitialized) {
        return <Loader />;
    }

    return <GameContext.Provider value={{ ...state, doSomething }}>{children}</GameContext.Provider>;
};

export default GameContext;


