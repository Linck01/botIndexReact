import { FormattedMessage } from 'react-intl';
import { IconInfoCircle } from '@tabler/icons';

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const main = {
    id: 'main',
    type: 'group',
    title: '',//<FormattedMessage id="info" />,
    children: [
        {
            id: 'home',
            title: <FormattedMessage id="home" />,
            type: 'item',
            url: '/',
            icon: IconInfoCircle,
            breadcrumbs: false
        },
    ]
};
