// action - state management
import { GAME_INITIALIZE, NEW_MESSAGES, LOAD_BETPAGE, LOAD_MEMBERPAGE } from './actions';

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const gameReducer = (state, action) => {
    switch (action.type) {
        case GAME_INITIALIZE: {
            const { game, socket, amIAdmin, amIMod } = action.payload;
            return {
                ...state,
                amIAdmin,
                amIMod,
                game,
                socket,
                isInitialized: true
            };
        }
        case NEW_MESSAGES: {
            let h;

            if (state.chatHistory)
                h = state.chatHistory.concat(action.messages);
            else
                h = action.messages;
            return {
                ...state,
                chatHistory: h
            };
        }
        case LOAD_BETPAGE: {
            return {
                ...state,
                betPage: action.betPage
            };
        }
        case LOAD_MEMBERPAGE: {
            return {
                ...state,
                memberPage: action.memberPage
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default gameReducer;