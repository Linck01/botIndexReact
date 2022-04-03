const config = {
    basename: '',
    defaultPath: '/',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    theme: 'dark',
    presetColor: 'theme1', // default, theme1, theme2, theme3, theme4, theme5, theme6
    // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    i18n: 'en',
    rtlLayout: false,
    jwt: {
        secret: '',
        timeout: '1 days'
    },
    apiHost: 'http://localhost:3005',
    authHost: 'http://localhost:3005',
    tipListPageSize: 8,
    betsPageSize: 9,
    hCaptchaSiteKey: '',
    captchaTickerInterval: 2,
};

export default config;