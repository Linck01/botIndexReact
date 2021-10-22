// action - state management
import { GAME_INITIALIZE, LOGIN } from './actions';

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state, action) => {
    switch (action.type) {
        case GAME_INITIALIZE: {
            const { game, socket } = action.payload;
            return {
                ...state,
                game,
                socket,
                isInitialized: true
            };
        }
        case LOGIN: {
            const { user } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                user
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
