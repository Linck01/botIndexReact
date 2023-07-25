import { useContext } from 'react';
import MemberCurrencyCard from './MemberCurrencyCard';
import GameContext from '../../../../../contexts/GameContext';

const NavGameBox = (props) => {
    const { game } = props;

    return (
        <>
            { game  ? <><MemberCurrencyCard /></> : ''}
        </>
    );
};


export default NavGameBox;
