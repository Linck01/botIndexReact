import PropTypes from 'prop-types';
import { useContext } from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Divider, List, Typography } from '@material-ui/core';
import MemberCurrencyCard from './MemberCurrencyCard';

// project imports
import GameContext from '../../../../../contexts/GameContext';
import useAuth from '../../../../../hooks/useAuth';


// style constant
const useStyles = makeStyles((theme) => ({
    menuCaption: {
        
    },
}));

//-----------------------|| SIDEBAR MENU LIST GROUP ||-----------------------//

const NavGameBox = ({ item }) => {
    const classes = useStyles();
    const { isInitialized, game, member } = useContext(GameContext);
    const { user } = useAuth();

    return (
        <>
            { game  ? <><MemberCurrencyCard user={user} member={member} game={game}/></> : ''}
        </>
    );
};


export default NavGameBox;
