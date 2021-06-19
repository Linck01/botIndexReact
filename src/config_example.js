const config = {
    // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: '/sample-page',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    theme: 'light',
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    i18n: 'en',
    rtlLayout: false,
    jwt: {
        secret: 'SECRET-KEY',
        timeout: '1 days'
    },
    firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: ''
    },
    auth0: {
        client_id: '',
        domain: ''
    }
};

export default config;
