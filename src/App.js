import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

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
//import { FirebaseProvider } from './contexts/FirebaseContext';
import {JWTProvider} from './contexts/JWTContext';
// import {Auth0Provider} from '../contexts/Auth0Context';
import { GameProvider } from './contexts/GameContext';


//-----------------------|| APP ||-----------------------//

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
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
    );
};

export default App;
