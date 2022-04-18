import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

// project imports
import useAuth from '../../hooks/useAuth';

//-----------------------|| AUTH GUARD ||-----------------------//

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const lastLocation = useLocation();

    if (!isLoggedIn) {
        return <Redirect to={'/login?fromLocation=' + lastLocation.pathname} />;
    }

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
