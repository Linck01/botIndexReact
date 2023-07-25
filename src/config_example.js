const config = {
    basename: '/',
    defaultPath: '/',
    fontFamily: 'Roboto',
    borderRadius: 12,
    outlinedFilled: true,
    theme: 'light',
    genericKeywords: ['bet', 'wager'],
    presetColor: 'theme4', // default, theme1, theme2, theme3, theme4, theme5, theme6
    // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    i18n: 'en',
    rtlLayout: false,
    /*jwt: {
        secret: '',
        timeout: '1 days'
    },*/
    apiHost: 'http://localhost:3005',
    gameHosts: ['http://localhost:3005'],
    authHost: 'http://localhost:3005',
    tipListPageSize: 8,
    betsPageSize: 9,
    hCaptchaSiteKey: '',
    captchaTickerInterval: 5,
    appUrl: ''
};

if (process.env.NODE_ENV == 'production') {
    config.apiHost = '';
    config.gameHosts = [''];
    config.authHost = '';
}

export default config;