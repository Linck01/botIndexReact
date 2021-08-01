import React from 'react';
import config from '../config.js';
// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconBasket, IconMessages, IconMail, IconCalendar, IconNfc } from '@tabler/icons';

// constant
const icons = {
    IconUserCheck: IconUserCheck,
    IconBasket: IconBasket,
    IconMessages: IconMessages,
    IconMail: IconMail,
    IconCalendar: IconCalendar,
    IconNfc: IconNfc
};

const subCategories = (platform) => {
    return [
        {
            id: 'most-viewed-' + platform,
            title: <FormattedMessage id="most-viewed" />,
            type: 'item',
            url: '/' + platform + '?sorting=most-viewed'
        },
        {
            id: 'best-rated-' + platform,
            title: <FormattedMessage id="best-rated" />,
            type: 'item',
            url: '/' + platform + '?sorting=best-rated'
        },
        {
            id: 'newest-' + platform,
            title: <FormattedMessage id="newest" />,
            type: 'item',
            url: '/' + platform + '?sorting=best-rated'
        }
    ]
}

//-----------------------|| APPLICATION MENU ITEMS ||-----------------------//

export const platforms = {
    id: 'platforms',
    title: <FormattedMessage id="platforms" />,
    type: 'group',
    children: config.platforms.map((platform) => {
        return {
            id: platform,
            title: <FormattedMessage id={platform} />,
            type: 'collapse',
            icon: icons['IconUserCheck'],
            children: subCategories(platform)
        }
    })
};


