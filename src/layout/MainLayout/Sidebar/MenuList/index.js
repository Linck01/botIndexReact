import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import NavGroup from './NavGroup';
import NavGameBox from './NavGameBox';
import menuItem from './../../../../menu-items';
import useAuth from '../../../../hooks/useAuth';
import fct from '../../../../utils/fct.js';
import GameContext from '../../../../contexts/GameContext';

const MenuList = () => {
    const { user } = useAuth();
    const { game } = useContext(GameContext);

    const navItems = menuItem.items.map((item) => {
        if (item.id === 'game') {
            if (!game) {
                return null;
            } else {

                item.title = '';//'Game: ' + game.title;
                for (let child of item.children)
                    child.url = '/game/' + fct.assembleGameOrBetSlug(game) + '/' + game.id + '/' + child.id 
                
                return <React.Fragment key={item.id}><NavGameBox game={game}/><NavGroup item={item} /></React.Fragment>
            }  
        }

        if (item.requiresAuth && !user)
            return null;

        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return navItems;
};

export default MenuList;
