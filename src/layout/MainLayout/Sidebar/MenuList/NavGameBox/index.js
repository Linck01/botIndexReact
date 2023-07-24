import { useContext } from 'react';
import MemberCurrencyCard from './MemberCurrencyCard';
import GameContext from '../../../../../contexts/GameContext';

const NavGameBox = ({ item }) => {
    const { game } = useContext(GameContext);

    return (
        <>
            { game  ? <><MemberCurrencyCard /></> : ''}
        </>
    );
};


export default NavGameBox;
