import React from 'react';
import config from '../config.js';
// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconServer, IconDeviceGamepad } from '@tabler/icons';


//-----------------------|| APPLICATION MENU ITEMS ||-----------------------//

export const userspace = {
    id: 'userspace',
    title: <FormattedMessage id="userspace" />,
    type: 'group',
    requiresAuth: true,
    children: [  
        {
            id: 'hostedGames',
            title: <FormattedMessage id="hostedGames" />,
            type: 'item',
            url: '/games/hosted',
            icon: IconServer,
            breadcrumbs: false
        },
        {
            id: 'favoritedGames',
            title: <FormattedMessage id="favoritedGames" />,
            type: 'item',
            url: '/games/favorite',
            icon: IconDeviceGamepad,
            breadcrumbs: false
        }
    ]
};


