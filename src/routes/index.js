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
const HomePage = Loadable(lazy(() => import('../views/Home')));
const bigGamesPage = Loadable(lazy(() => import('../views/BigGames')));
const newGamesPage = Loadable(lazy(() => import('../views/NewGames')));
const oldGamesPage = Loadable(lazy(() => import('../views/OldGames')));

const gameBetsPage = Loadable(lazy(() => import('../views/game/Bets')));
const gameChatPage = Loadable(lazy(() => import('../views/game/Chat')));
const gameInfoPage = Loadable(lazy(() => import('../views/game/Info')));
const gameLogPage = Loadable(lazy(() => import('../views/game/Log')));
const gameMembersPage = Loadable(lazy(() => import('../views/game/Members')));
const gameBetPage = Loadable(lazy(() => import('../views/Bet')));

const hostedGames = Loadable(lazy(() => import('../views/HostedGames')));
const joinedGames = Loadable(lazy(() => import('../views/JoinedGames')));
const infoPage = Loadable(lazy(() => import('../views/Info')));
const termsAndConditions = Loadable(lazy(() => import('../views/TermsAndConditions')));
const aboutPage = Loadable(lazy(() => import('../views/About')));

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
            
            <Route exact path={['/game/:gameId/', '/game/:gameId/bets', '/game/:gameId/members', '/game/:gameId/log', '/game/:gameId/info', '/game/:gameId/chat', '/game/:gameId/bet/:betId']}>
               
                    <MainLayout>
                        <GameProvider>
                        <Switch>
                            <Route exact path={'/game/:gameId/bets'} component={gameBetsPage} />
                            <Route exact path={'/game/:gameId/members'} component={gameMembersPage} />
                            <Route exact path={'/game/:gameId/log'} component={gameLogPage} />
                            <Route exact path={'/game/:gameId/info'} component={gameInfoPage} />
                            <Route exact path={'/game/:gameId/chat'} component={gameChatPage} />
                            <Route exact path={'/game/:gameId/'} component={gameBetsPage} />
                            <Route exact path={'/game/:gameId/bet/:betId'} component={gameBetPage} />
                        </Switch> 
                        </GameProvider>        
                    </MainLayout>
              
            </Route>

            <Route exact path={['/','/games/big/','/games/new/','/games/old/','/games/hosted/','/games/joined/','/mybots/','/info/','/termsAndService/','/about/']}>
                <MainLayout>
                    <Switch>
                        <Route exact path="/" component={HomePage} />

                        <Route exact path={'/games/big/'} component={bigGamesPage}  />
                        <Route exact path={'/games/new/'} component={newGamesPage}  />
                        <Route exact path={'/games/old/'} component={oldGamesPage}  />


                        <Route exact path={'/info/'} component={infoPage}  />
                        <Route exact path={'/termsAndService/'} component={termsAndConditions}  />
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
