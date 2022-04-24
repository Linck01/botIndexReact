// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconMail, IconNotebook, IconInfoCircle, IconEdit, IconUser, IconTrophy, IconHistory } from '@tabler/icons';

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
            icon: IconTrophy,
            breadcrumbs: false
        },
        {
            id: 'members',
            title: <FormattedMessage id="members" />,
            type: 'item',
            url: '/',
            icon: IconUser,
        },
        {
            id: 'chat',
            title: <FormattedMessage id="chat" />,
            type: 'item',
            url: '/',
            icon: IconNotebook,
        },
        {
            id: 'log',
            title: <FormattedMessage id="log" />,
            type: 'item',
            url: '/',
            icon: IconHistory,
        },
        {
            id: 'info',
            title: <FormattedMessage id="info" />,
            type: 'item',
            url: '/',
            icon: IconInfoCircle,
        },
        {
            id: 'settings',
            title: <FormattedMessage id="settings" />,
            type: 'item',
            url: '/',
            icon: IconEdit,
        }
    ]
};
