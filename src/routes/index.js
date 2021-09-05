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


// sample page routing
const HomePage = Loadable(lazy(() => import('../views/homePage')));
const botMultiPage = Loadable(lazy(() => import('../views/botMultiPage')));
const botSinglePage = Loadable(lazy(() => import('../views/botSinglePage')));
const botEditPage = Loadable(lazy(() => import('../views/botEditPage')));
const myBotsPage = Loadable(lazy(() => import('../views/myBotsPage')));
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

            <Route exact path={['/','/bot/:platform/:id/','/bot/:platform/:id/edit/','/bots/:platform/','/bots/:platform/:sorting/','/mybots/']}>
                <MainLayout>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                       
                        <Route exact path={'/bots/:platform/'} component={botMultiPage}  />
                        <Route exact path={'/bots/:platform/:sorting/'} component={botMultiPage}  />
                        <Route exact path={'/bot/:platform/:id/'} component={botSinglePage} />

                        <AuthGuard>
                            <Route exact path={'/bot/:platform/:id/edit/'} component={botEditPage} />
                            <Route exact path={'/mybots/'} component={myBotsPage} />
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
