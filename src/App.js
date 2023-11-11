import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';
import { Helmet } from "react-helmet";

// routing
import Routes from './routes';

// defaultTheme
import theme from './themes';

// project imports
import Locales from './ui-component/Locales';
import NavigationScroll from './layout/NavigationScroll';

// import RTLLayout from './ui-component/RTLLayout';
import Snackbar from './ui-component/extended/Snackbar';

// auth provider
import {JWTProvider} from './contexts/JWTContext';

// google analytics
import ReactGA from 'react-ga4';
const TRACKING_ID = "G-051Z8ZHRFT"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);


//-----------------------|| APP ||-----------------------//

const App = () => {
    const customization = useSelector((state) => state.customization);

    React.useEffect(() => {
        console.log('SENDING GA');
        ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search});
        console.log('SENDING GA');
    }, []);

    return (
        <>
        <Helmet>
            <title>Betify.gg - Bet for fun</title>
            <meta name="title" content="Betify.gg - Bet for fun" />
            <meta name="description" content="Bet for fun about anything with anyone. Make predictions, wager for outcomes, gamble play money, create custom bets online for your peers, friends and community."/>
            <meta name="keywords" content="bet, wager, bet for fun, play money, gamble, custom bet, predictions, friends, friend bet, peer bet, handshake bet, community, community bet, custom, online"/>
        </Helmet>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
                <CssBaseline />
                <Locales>
                    <NavigationScroll>
                        <JWTProvider>               
                                <Routes />
                                <Snackbar />
                        </JWTProvider>
                    </NavigationScroll>
                </Locales>
            </ThemeProvider>
        </StyledEngineProvider>
        </>
    );
};

export default App;
