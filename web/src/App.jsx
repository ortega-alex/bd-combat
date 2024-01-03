import { ConfigProvider } from 'antd';
import esEs from 'antd/es/locale/es_ES';
import React, { Suspense, lazy, useEffect } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route } from 'react-router-dom';
import { Loading, RoutesWithNotFound } from './components';
import { AuthGuard } from './guards';
import { PublicPrivateInterceptor } from './interceptors';
import { colors } from './models';
import { PrivateRotes, PublicRotes } from './models/route';
import { store } from './redux';

const SignIn = lazy(() => import('@/pages/sign-in/SignIn'));
const Private = lazy(() => import('@/pages/private/Private'));

export default function App() {
    useEffect(() => {
        PublicPrivateInterceptor();
    }, []);

    return (
        <React.StrictMode>
            <Suspense fallback={<Loading />}>
                <Provider store={store}>
                    <ConfigProvider
                        locale={esEs}
                        theme={{
                            token: {
                                colorPrimary: colors.primary,
                                colorError: colors.danger,
                                borderRadius: 10
                            }
                        }}
                    >
                        <HashRouter>
                            <RoutesWithNotFound>
                                <Route path='/' element={<Navigate to={PrivateRotes.PRIVATE} />} />
                                <Route path={PublicRotes.SIGN_IN} element={<SignIn />} />
                                <Route element={<AuthGuard />}>
                                    <Route path={`${PrivateRotes.PRIVATE}/*`} element={<Private />} />
                                </Route>
                            </RoutesWithNotFound>
                        </HashRouter>
                    </ConfigProvider>
                </Provider>
            </Suspense>
        </React.StrictMode>
    );
}
