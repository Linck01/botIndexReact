import React, { createContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import useAuth from '../hooks/useAuth';
import {  SET_MEMBER, SET_GAME, SET_SOCKET, SET_BETSPAGE, SET_BETPAGE, 
    SET_CHAT, SET_PRIVILEGES, SET_LOGSPAGE, SET_MEMBERSPAGE } from '../store/actions';
import gameReducer from '../store/gameReducer';
import axios from '../utils/axios';
import config from '../config';
import fct from '../utils/fct.js';

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
        },
    },
    privileges: {
        admin: false,
        mod: false
    },
    member: null,
    chat: {
        items: [],
    },
    betsPage: {
        items: [],
        index: 1,
        maxIndex: 1,
    },
    membersPage: {
        items: [],
        index: 1,
        maxIndex: 1,
    },
    logsPage: {
        items: [],
        index: 1,
        maxIndex: 1,
    },
};

const GameContext = createContext({
    ...initialState,
    setBetPage: () => Promise.resolve(),
    setBetsPage: () => Promise.resolve(),
    setChat: () => Promise.resolve(),
    setLogsPage: () => Promise.resolve(),
    setMembersPage: () => Promise.resolve(),
    setGame: () => Promise.resolve(),
});

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    let { gameUri } = useParams();
    const { user } = useAuth();
    const gameId = fct.disassembleGameOrBetUri(gameUri);
    
    /*
    *  Game
    */
    const fetchGame = async (id) => {
        try {
            console.log('Get game id' + id);
            const response = await axios.get(config.authHost + '/v1/games/' + id);

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

    const setPrivileges = async (privileges) => {
        dispatch({
            type: SET_PRIVILEGES,
            privileges: privileges
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
                console.log('Joining room game:' + gameId);
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

    const setBetPage = async (betPage) => {
        dispatch({
            type: SET_BETPAGE,
            betPage: betPage
        });
    };
    

    /*
    *  Member
    */
    
    const fetchMember = async (game,userId) => {
        try {
            console.log('Get member id ' + userId);
            const response = await axios.get(config.gameHosts[game.serverId] + '/v1/members/' + gameId + '/' + userId);
            
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
    
    const setMembersPage = async (membersPage) => {
        dispatch({
            type: SET_MEMBERSPAGE,
            membersPage: membersPage
        });
    };

    /*
    *  Logs
    */

     const setLogsPage = async (logsPage) => {
        dispatch({
            type: SET_LOGSPAGE,
            logsPage: logsPage
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
    *  Socket - Events
    */

    // Update Game
    useEffect(() => {
        if (state.socket)
            state.socket.on('updateGame', function(data) { 
                console.log('Received socket message updateGame.'); 
                setGame(data);
            });

        return function cleanup() {
            if (state.socket)
                state.socket.off('updateGame');
        };

    }, [state.socket, state.game]);

    // New Bet
    useEffect(() => {
        if (state.socket)
            state.socket.on('newBet', function(data) {
                console.log('Received socket message newBet.'); 
                handleSocketNewBet(data);
            });

        return function cleanup() {
            if (state.socket)
                state.socket.off('newBet');
        };

    }, [state.socket, state.betsPage]);
    
    // Update Bet
    useEffect(() => {
        if (state.socket) {
            state.socket.on('updateBet', function(data) {
                console.log('Received socket message updateBet.');
                handleSocketUpdateBet(data);
            });

            return function cleanup() {
                state.socket.off('updateBet');
            };
        }
    }, [state.socket, state.betPage, state.betsPage]);

    // New Tip
    useEffect(() => {
        if (state.socket) {
            state.socket.on('newTip', function(data) {
                console.log('Received socket message newTip.');
                handleSocketNewTip(data.member,data.bet,data.tip);
            });

            return function cleanup() {
                state.socket.off('newTip');
            };
        }
    }, [state.socket, state.betPage, state.betsPage]);

    // Update Tips
    useEffect(() => {
        if (state.socket) {
            state.socket.on('updateTips', function(data) {
                console.log('Received socket message updateTips.');
                handleSocketUpdateTips(data.bet,data.tips);
            });

            return function cleanup() {
                state.socket.off('updateTips');
            };
        }
    }, [state.socket, state.betPage, state.betsPage]);

    const handleSocketUpdateTips = async (bet,tips) => {   
        const newTipListItems = await updateTipListItemsWithUpdatedTips(tips);
        setBetPage({...state.betPage, bet, tipListPage: {...state.betPage.tipListPage, items: newTipListItems}});

        if (bet.isPaid && state.member) {
            const memberTips = tips.filter(t => t.userId === state.member.userId);
            let memberInc = 0;
            for(let tip of memberTips)
                memberInc += parseFloat(tip.currency.$numberDecimal) + parseFloat(tip.diff.$numberDecimal);
            
            if (memberInc !== 0) setMember({...state.member, currency: {$numberDecimal: (parseFloat(state.member.currency.$numberDecimal) + memberInc).toString()}});
        }
    }

    const handleSocketNewTip = async (member,bet,tip) => {
        if (state.betPage.bet && state.betPage.bet.id === bet.id) {
            const newTipListItems = await updateTipListItemsWithNewTip(tip);
            const newMyTips = await updateMyTipsWithNewTip(tip);  
            
            let maxIndex = state.betPage.tipListPage.maxIndex;
            if ((state.betPage.tipListPage.items.length+1) / config.tipListPageSize !== 0 &&
                    (state.betPage.tipListPage.items.length+1) % config.tipListPageSize === 1)
                maxIndex++;

            setBetPage({...state.betPage, bet, myTips: newMyTips, tipListPage: {...state.betPage.tipListPage, items: newTipListItems, maxIndex: maxIndex}});
        }

        await updateBetsPageWithBet(bet); 
        
        if (user && user.id === member.userId) 
            setMember(member);
    }

    const handleSocketNewBet = async (bet) => {
        let maxIndex = state.betsPage.maxIndex;

        if ((state.betsPage.items.length+1) / config.betsPageSize !== 0 &&
                (state.betsPage.items.length+1) % config.betsPageSize === 1)
            maxIndex++;

        setBetsPage({...state.betsPage,items:[bet,...state.betsPage.items],maxIndex: maxIndex})
    }

    const handleSocketUpdateBet = async (bet) => {
        if (state.betPage.bet && state.betPage.bet.id === bet.id)
            setBetPage({...state.betPage, bet});

        await updateBetsPageWithBet(bet);
    }

    // Socket helper functions

    const updateTipListItemsWithUpdatedTips = async (tips) => {
        let newItems = [], foundTip;

        for (let oldTip of state.betPage.tipListPage.items) {
            foundTip = tips.find(t => t._id === oldTip.id);
            if (foundTip)
                newItems.push(foundTip);
        }

        await fct.addUsernamesToArray(newItems);
    
        return newItems;
    }

    const updateBetsPageWithBet = async (newBet) => {
        let newBets = [], replaced = false;

        for (let bet of state.betsPage.items) {
            if (bet.id === newBet.id) {
                newBets.push(newBet);
                replaced = true;
            } else
                newBets.push(bet);
        }
        
        if (replaced)
            setBetsPage({...state.betsPage, items: newBets}); 
    }

    const updateTipListItemsWithNewTip = async (newTip) => {
        let newItems = [];
        for (let tip of state.betPage.tipListPage.items)
            newItems.push(tip);
        
        if (state.betPage.tipListPage.index === 1) {
            newItems.unshift(newTip);

            if (state.betPage.tipListPage.items.length >= config.tipListPageSize) 
                newItems.pop();
        }
            
        await fct.addUsernamesToArray(newItems);
    
        return newItems;
    }
    
    const updateMyTipsWithNewTip = async (newTip) => {
        let newMyTips = [];
        
        for (let tip of state.betPage.myTips)
                newMyTips.push(tip);
        
        if (user && user.id === newTip.userId)
            newMyTips.push(newTip);
        
        return newMyTips; 
    }

    /*
    *  Init
    */

    useEffect(() => {
        const init = async () => {
            const game = await fetchGame(gameId);
            if (!game)
                return;
            
            const socket = await initSocket(config.gameHosts[game.serverId]);
            if (!socket)
                return;
            setSocket(socket);

            let admin = false, mod = false, member = null;
            if (user) {
                member = await fetchMember(game,user.id);
                setMember(member);

                if (game.userId === user.id)
                    admin = true;
                if (member && member.isModerator)
                    mod = true;
            }

            setPrivileges({...state.privileges, admin, mod});
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

    return <GameContext.Provider value={{ ...state, setBetsPage, setChat, setBetPage, setLogsPage, setMembersPage, setGame }}>{children}</GameContext.Provider>;
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
