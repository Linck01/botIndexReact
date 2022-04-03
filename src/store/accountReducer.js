// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT, REGISTER, SET_USER } from './actions';

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state, action) => {
    switch (action.type) {
        case ACCOUNT_INITIALIZE: {
            const { isLoggedIn, user } = action.payload;
            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                user
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
        case SET_USER: {
            const { user } = action.payload;
            return {
                ...state,
                user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }
        case REGISTER: {
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
