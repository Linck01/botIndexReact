// project imports
import config from './../config';

import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';
import GuestGuard from './../utils/route-guard/GuestGuard';
import MinimalLayout from './../layout/MinimalLayout';
import NavMotion from './../layout/NavMotion';
import {GameProvider} from '../contexts/GameContext';

// sample page routing
const HomePage = Loadable(lazy(() => import('../views/homePage')));
const bigGamesPage = Loadable(lazy(() => import('../views/bigGamesPage')));
const newGamesPage = Loadable(lazy(() => import('../views/newGamesPage')));
const oldGamesPage = Loadable(lazy(() => import('../views/oldGamesPage')));
const gameSinglePage = Loadable(lazy(() => import('../views/gameSinglePage')));
const hostedGames = Loadable(lazy(() => import('../views/hostedGames')));
const joinedGames = Loadable(lazy(() => import('../views/joinedGames')));
const infoPage = Loadable(lazy(() => import('../views/infoPage')));
const termsAndServicePage = Loadable(lazy(() => import('../views/termsAndServicePage')));
const aboutPage = Loadable(lazy(() => import('../views/aboutPage')));

const ErrorPage = Loadable(lazy(() => import('../views/pages/maintenance/Error.js')));
const AuthLogin = Loadable(lazy(() => import('../views/pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('../views/pages/authentication/Register')));
const AuthForgotPassword = Loadable(lazy(() => import('../views/pages/authentication/ForgotPassword')));
const AuthCheckMail = Loadable(lazy(() => import('../views/pages/authentication/CheckMail')));
const AuthResetPassword = Loadable(lazy(() => import('../views/pages/authentication/ResetPassword')));
const AuthCodeVerification = Loadable(lazy(() => import('../views/pages/authentication/CodeVerification')));

//-----------------------|| ROUTING RENDER ||-----------------------//


const Routes = () => {
    const location = useLocation();
    return (
        <Switch>
            {/* MainLayout routes */}

            <Route exact path={['/','/game/:id/','/games/big/','/games/new/','/games/old/','/games/hosted/','/games/joined/','/mybots/','/info/','/termsAndService/','/about/']}>
                <MainLayout>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                       
                        <Route exact path={'/games/big/'} component={bigGamesPage}  />
                        <Route exact path={'/games/new/'} component={newGamesPage}  />
                        <Route exact path={'/games/old/'} component={oldGamesPage}  />
                     
                        <Route exact path={'/game/:id/'} component={gameSinglePage} />
                        
                        <Route exact path={'/info/'} component={infoPage}  />
                        <Route exact path={'/termsAndService/'} component={termsAndServicePage}  />
                        <Route exact path={'/about/'} component={aboutPage}  />

                        <AuthGuard>
                            <Route exact path={'/games/hosted'} component={hostedGames} />
                            <Route exact path={'/games/joined'} component={joinedGames} />
                        </AuthGuard>
                    </Switch>
                </MainLayout>
            </Route>

            {/* MinimalLayout routes */}

            <Route exact path={[
                '/login',
                '/register',
                '/forgot-password',
                '/check-mail',
                '/reset-password',
                '/code-verification',]}>
                <MinimalLayout>
                    <Switch>
                        <GuestGuard>
                            <Route path="/login" component={AuthLogin} />
                            <Route path="/register" component={AuthRegister} />
                            <Route path="/forgot-password" component={AuthForgotPassword} />
                            <Route path="/check-mail" component={AuthCheckMail} />
                            <Route path="/reset-password" component={AuthResetPassword} />
                            <Route path="/code-verification" component={AuthCodeVerification} />
                        </GuestGuard>
                    </Switch>
                </MinimalLayout>
            </Route>
        
            {/* 404 route */}

            <Route>
                <MinimalLayout>
                    <Route component={ErrorPage} />  
                </MinimalLayout>
            </Route>


        </Switch>
    );
};

export default Routes;
