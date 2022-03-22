import React from 'react';
import config from '../config.js';
// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconCalendar, IconBrandAppleArcade, IconUsers } from '@tabler/icons';



const tags = () => {
    return 
}

//-----------------------|| APPLICATION MENU ITEMS ||-----------------------//

export const publicGames = {
    id: 'publicGames',
    title: <FormattedMessage id="publicGames" />,
    type: 'group',
    children: [
        {
            id: 'T&S',
            title: <FormattedMessage id="bigGames" />,
            type: 'item',
            url: '/games/big',
            icon: IconUsers,
            breadcrumbs: false
        },
        {
            id: 'Info',
            title: <FormattedMessage id="newGames" />,
            type: 'item',
            url: '/games/new',
            icon: IconBrandAppleArcade,
        },
        /*{
            id: 'About',
            title: <FormattedMessage id="oldGames" />,
            type: 'item',
            url: '/games/old',
            icon: IconCalendar,
        }*/
    ]
};
