import { useContext } from 'react';

import GameContext from '../contexts/GameContext';

const useGame = () => useContext(GameContext);

export default useGame;
