// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconMail, IconNotebook, IconInfoCircle, IconEdit } from '@tabler/icons';

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const game = {
    id: 'game',
    type: 'group',
    title: '',
    children: [
        {
            id: 'bets',
            title: <FormattedMessage id="bets" />,
            type: 'item',
            url: '/',
            icon: IconInfoCircle,
            breadcrumbs: false
        },
        {
            id: 'log',
            title: <FormattedMessage id="log" />,
            type: 'item',
            url: '/',
            icon: IconMail,
        },
        {
            id: 'members',
            title: <FormattedMessage id="members" />,
            type: 'item',
            url: '/',
            icon: IconMail,
        },
        {
            id: 'chat',
            title: <FormattedMessage id="chat" />,
            type: 'item',
            url: '/',
            icon: IconNotebook,
        },
        /*{
            id: 'info',
            title: <FormattedMessage id="info" />,
            type: 'item',
            url: '/',
            icon: IconMail,
        },*/
        {
            id: 'settings',
            title: <FormattedMessage id="settings" />,
            type: 'item',
            url: '/',
            icon: IconEdit,
        }
    ]
};
