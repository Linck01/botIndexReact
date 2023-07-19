import React from 'react';
import config from '../config.js';
import { FormattedMessage } from 'react-intl';
import { IconUserCheck, IconBasket, IconMessages, IconMail, IconCalendar, IconNfc } from '@tabler/icons';

const icons = {
    IconUserCheck: IconUserCheck,
    IconBasket: IconBasket,
    IconMessages: IconMessages,
    IconMail: IconMail,
    IconCalendar: IconCalendar,
    IconNfc: IconNfc
};

const tags = () => {
    return 
}

//-----------------------|| APPLICATION MENU ITEMS ||-----------------------//

export const bots = {
    id: 'bots',
    title: <FormattedMessage id="bots" />,
    type: 'group',
    children:  [{
        id: 'platforms',
        title: <FormattedMessage id='platforms' />,
        type: 'collapse',
        icon: icons['IconUserCheck'],
        children: config.platforms.map((platform) => {return {
            id: platform,
            title: <FormattedMessage id={platform} />,
            type: 'item',
            url: '/bots/platform/' + platform
        }}).concat([{
            id: 'allPlatforms',
            title: <FormattedMessage id='allPlatforms' />,
            type: 'item',
            url: '/bots/platforms'
        }])
    },
    {
        id: 'tags',
        title: <FormattedMessage id='tags' />,
        type: 'collapse',
        icon: icons['IconUserCheck'],
        children: config.tags.map((tag) => {return {
            id: tag,
            title: <FormattedMessage id={tag} />,
            type: 'item',
            url: '/bots/tag/' + tag
        }}).concat([{
            id: 'allTags',
            title: <FormattedMessage id='allTags' />,
            type: 'item',
            url: '/bots/tags'
        }])
    }]
};


