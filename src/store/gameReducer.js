// action - state management
import { GAME_INITIALIZE, LOGIN } from './actions';

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state, action) => {
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
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
