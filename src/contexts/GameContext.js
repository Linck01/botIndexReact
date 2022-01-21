import React, { createContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import useAuth from '../hooks/useAuth';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { GAME_INITIALIZE, INIT_CHAT, NEW_MESSAGES, SET_BETPAGEINDEX, 
    SET_MEMBERPAGEINDEX, SET_MEMBER, SET_HANDLENEWTIP, SET_BET, SET_MYTIPS, 
    SET_GAME, SET_SOCKET, SET_BETSPAGE, SET_BETPAGE, SET_CHAT } from '../store/actions';
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
    betPage: {
        bet: null,
        myTips: [],
        tipListPage: {
            items: [],
            index: 1,
            maxIndex: 1,
            isInitialized: false
        },
        isInitialized: false
    },
    amIAdmin: false,
    amIMod: false,
    member: null,
    chat: {
        items: [],
        isInitialized: false
    },
    betsPage: {
        items: [],
        index: 1,
        maxIndex: 1,
        isInitialized: false
    },
    memberPageIndex: 1,
};



//-----------------------|| JWT CONTEXT & PROVIDER ||-----------------------//

const GameContext = createContext({
    ...initialState,
    initChat: () => Promise.resolve(),
    setBetsPage: () => Promise.resolve(),
    setChat: () => Promise.resolve()
});


export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    let { gameId } = useParams();
    const { user } = useAuth();
    console.log('GAMECONTEXT id' + gameId);

    /*
    *  Game
    */

    const fetchGame = async (id) => {
        try {
            console.log('Get game id' + id);
            const response = await axios.get(config.authHost + '/v1/games/' + id);
            
            if (process.env.NODE_ENV != 'production') 
                response.data.server = 'http://localhost:3005';

            await fct.sleep(500);

            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const setGame = (game) => {
        dispatch({
            type: SET_GAME,
            game: game
        });
    };

     /*
    *  Socket 
    */

     const initSocket = async (url) => {
        if (!state.socket) {
            const socket = io(url,{transports: ['websocket','polling']});
            console.log('Connecting to websocket.');

            socket.on('connect', function() {
                socket.emit('room', 'game:' + gameId);
                console.log('Joining room ' + gameId);
            });

            return socket;
        } else if (!state.socket.connected)
            console.log('Please reconnect to websocket.');

    };

    const setSocket = async (socket) => {
        dispatch({
            type: SET_SOCKET,
            socket: socket
        });
    };

     /*
    *  Bets
    */
    
     const setBetsPage = async (betsPage) => {
        dispatch({
            type: SET_BETSPAGE,
            betsPage: betsPage
        });
    };

    const updateBetsWithNewBet = async (newBet) => {
        let newBets = [], replaced = false;

        for (let bet of state.betsPage.items) {
            if (bet.id == newBet.id) {
                newBets.push(newBet)
                replaced = true;
            } else
            newBets.push(bet);
        }
        
        
        return newBets; 
    }


    /*
    *  Bet
    */

    const setBetPage = async (betPage) => {
        dispatch({
            type: SET_BETPAGE,
            betPage: betPage
        });
    };

    const updateTipListPageWithNewTip = async (newTip) => {
        let newItems = [],replaced = false;
      
        for (let tip of state.betPage.tipListPage.items) {
            if (tip.id == newTip.id) {
                newItems.unshift(newTip)
                replaced = true;
            } else
            newItems.push(tip);
        }
        
        if (!replaced && state.betPage.tipListPage.index == 1) {
            newItems.pop();
            newItems.unshift(newTip);
        }
            
        await fct.addUsernamesToArray(newItems);
    
        return newItems;
    }
    
    const updateMyTipsWithNewTip = async (newTip) => {
        let newMyTips = [], replaced = false;

        for (let tip of state.betPage.myTips) {
            if (tip.id == newTip.id) {
                newMyTips.push(newTip)
                replaced = true;
            } else
                newMyTips.push(tip);
        }
        if (!replaced)
            newMyTips.push(newTip);
        
        
        return newMyTips; 
    }

    /*
    *  Member
    */
    
    const fetchMember = async (game,userId) => {
        try {
            console.log('Get member id ' + userId);
            const response = await axios.get( game.server + '/v1/members/' + gameId + '/' + userId);

            await fct.sleep(500);
            
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const setMember = async (member) => {
        dispatch({
            type: SET_MEMBER,
            member: member
        });
    };

    /*
    *  Chat
    */

    
    const setChat = async (chat) => { 
        dispatch({
            type: SET_CHAT,
            chat: chat
        });
    };

    /*
    *  Socket events
    */

    useEffect(() => {
        if (state.socket)
            state.socket.on('chatMessage', function(newMessage) {    
                const newItems = [...state.chat.items, newMessage]
                setChat({...state.chat, items: newItems});
            });

        return function cleanup() {
            if (state.socket) 
                state.socket.off('chatMessage');
        };

    }, [state.socket,state.chat]);

    useEffect(() => {
        if (state.socket)
            state.socket.on('newTip', function(data) { 
                handleSocketNewTip(data);
            });

        return function cleanup() {
            if (state.socket)
                state.socket.off('newTip');
        };

    }, [state.socket, state.betPage, state.betsPage]);
    
    const handleSocketNewTip = async (data) => {
        if (state.betPage.isInitialized && state.betPage.bet.id == data.bet.id) {
            const newItems = await updateTipListPageWithNewTip(data.tip);
            const newMyTips = await updateMyTipsWithNewTip(data.tip);  
            
            setBetPage({...state.betPage, bet: data.bet, myTips: newMyTips, tipListPage: {...state.betPage.tipListPage, items: newItems}});
        }

        if (state.betsPage.isInitialized && state.betsPage.items.map(b => b.id).includes(data.bet.id)) {
            const newBets = await updateBetsWithNewBet(data.bet); 
            setBetsPage({...state.betsPage, items: newBets});
        }
    }

    /*
    *  Init
    */

    useEffect(() => {
        const init = async () => {
            const game = await fetchGame(gameId);
            console.log(game);
            if (!game)
                return;
            
            const socket = await initSocket(game.server);
            if (!socket)
                return;
            setSocket(socket);

            let amIAdmin = false, amIMod = false, member = null;
            if (user) {
                member = await fetchMember(game,user.id);
                setMember(member);

                if (game.userId == user.id)
                    amIAdmin = true;
                if (game.moderators.includes(user.id))
                    amIMod = true;
            }

            setGame(game);
        };

        init();

        return function cleanup() {
            if (state.socket)
                state.socket.disconnect();
        };
    }, []);

    /*
    if (!state.isInitialized) {
        return <Loader />;
    } */

    return <GameContext.Provider value={{ ...state, setBetsPage, setChat, setBetPage }}>{children}</GameContext.Provider>;
};

export default GameContext;

/* 
const setBetPageIndex = async (index) => {
        dispatch({
            type: SET_BETPAGEINDEX,
            betPageIndex: index
        });
    };

const setMemberPageIndex = async (index) => {
    dispatch({
        type: SET_MEMBERPAGEINDEX,
        memberPageIndex: index
    });
}; 

*/
