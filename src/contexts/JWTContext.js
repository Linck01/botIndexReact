import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT, REGISTER } from '../store/actions';
import accountReducer from '../store/accountReducer';
import io from 'socket.io-client';

// project imports
import axios from '../utils/axios';
import Loader from '../ui-component/Loader';
import config from '../config';

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    return decoded.exp > Date.now() / 1000;
};

const setSessionAndSocket = (userId, accessToken) => {
    if (userId && accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userId', userId);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // Set socket for notifications
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        delete axios.defaults.headers.common.Authorization;
    }
};

//-----------------------|| JWT CONTEXT & PROVIDER ||-----------------------//

const JWTContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
    sendVerificationEmail: () => Promise.resolve(),
});

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    const login = async (email, password) => {
        const response = await axios.post(config.authHost + '/v1/auth/login', { email, password });
 
        console.log(response);
        const { tokens, user } = response.data;
        setSessionAndSocket(user.id, tokens.access.token);
        dispatch({
            type: LOGIN,
            payload: {
                user
            }
        });
    };

    const logout = () => {
        setSessionAndSocket(null);
        dispatch({ type: LOGOUT });
    };

    const register = async (username, email, password, captchaToken) => {
        const response = await axios.post(config.authHost + '/v1/auth/register', { username, email, password, captchaToken });
 
        console.log(response);
        const { tokens, user } = response.data;
        setSessionAndSocket(user.id, tokens.access.token);
        dispatch({
            type: REGISTER,
            payload: {
                user
            }
        });
    };

    const sendVerificationEmail = async (username, email) => {
        const response = await axios.post(config.authHost + '/v1/auth/send-verification-email', { username, email });
 
        console.log(response);
    };

    useEffect(() => {
        const init = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');
                const userId = window.localStorage.getItem('userId');

                if (userId && accessToken && verifyToken(accessToken)) {
                    setSessionAndSocket(userId, accessToken);
                    const response = await axios.get(config.authHost + '/v1/users/' + userId);

                    const user = response.data;
                    dispatch({
                        type: ACCOUNT_INITIALIZE,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: ACCOUNT_INITIALIZE,
                        payload: {
                            isLoggedIn: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: ACCOUNT_INITIALIZE,
                    payload: {
                        isLoggedIn: false,
                        user: null
                    }
                });
            }
        };

        init();
    }, []);

    if (!state.isInitialized) {
        return <Loader />;
    }

    return <JWTContext.Provider value={{ ...state, login, logout, register, sendVerificationEmail }}>{children}</JWTContext.Provider>;
};

export default JWTContext;


