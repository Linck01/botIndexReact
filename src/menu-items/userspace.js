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
            id: 'favoritebots',
            title: <FormattedMessage id="hostedGames" />,
            type: 'item',
            url: '/games/hosted',
            icon: IconServer,
            breadcrumbs: false
        },
        {
            id: 'mybots',
            title: <FormattedMessage id="joinedGames" />,
            type: 'item',
            url: '/games/joined',
            icon: IconDeviceGamepad,
            breadcrumbs: false
        }
    ]
};


