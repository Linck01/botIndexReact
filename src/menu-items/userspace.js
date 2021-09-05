import React from 'react';
import config from '../config.js';
// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap
};

//-----------------------|| APPLICATION MENU ITEMS ||-----------------------//

export const userspace = {
    id: 'Userspace',
    title: <FormattedMessage id="userspace" />,
    type: 'group',
    children: [  
        {
            id: 'favoritebots',
            title: <FormattedMessage id="favoritebots" />,
            type: 'item',
            url: '/favoritebots',
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        },
        {
            id: 'mybots',
            title: <FormattedMessage id="mybots" />,
            type: 'item',
            url: '/mybots',
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        }
    ]
};


