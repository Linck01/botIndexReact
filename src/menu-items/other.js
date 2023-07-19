import { FormattedMessage } from 'react-intl';
import { IconMail, IconNotebook } from '@tabler/icons';

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const other = {
    id: 'other',
    type: 'group',
    title: '',//<FormattedMessage id="info" />,
    children: [
        /*{
            id: 'info',
            title: <FormattedMessage id="info" />,
            type: 'item',
            url: '/info',
            icon: IconInfoCircle,
            breadcrumbs: false
        },*/
        {
            id: 'termsAndService',
            title: <FormattedMessage id="termsAndService" />,
            type: 'item',
            url: '/termsAndService',
            icon: IconNotebook,
        },
        {
            id: 'privacyPolicy',
            title: <FormattedMessage id="privacyPolicy" />,
            type: 'item',
            url: '/privacyPolicy',
            icon: IconNotebook,
        },
        {
            id: 'About',
            title: <FormattedMessage id="about" />,
            type: 'item',
            url: '/about',
            icon: IconMail,
        }
    ]
};
