import { useContext } from 'react';

// material-ui
import { Typography } from '@material-ui/core';
import { useLocation, useParams } from 'react-router-dom';

// project imports
import NavGroup from './NavGroup';
import menuItem from './../../../../menu-items';
import useAuth from '../../../../hooks/useAuth';
import GameContext from '../../../../contexts/GameContext';

//-----------------------|| SIDEBAR MENU LIST ||-----------------------//

const MenuList = () => {
    const location = useLocation();
    const { user } = useAuth();
    const { game } = useContext(GameContext);

    const navItems = menuItem.items.map((item) => {
        if (item.id == 'game') {
            if (!game) {
                return (<></>);
            } else {
                item.title = 'Game: ' + game.name;
                for (let child of item.children)
                    child.url = '/game/' + game.id + '/' + child.id 
                console.log(item);
            }  
        }

        if (item.requiresAuth && !user)
            return (<></>);

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
