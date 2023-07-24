import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IconBrandAppleArcade, IconUsers } from '@tabler/icons';

export const publicGames = {
    id: 'publicGames',
    title: '', //<FormattedMessage id="publicGames" />,
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
