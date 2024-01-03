import { ConfigProvider } from 'antd';
import esEs from 'antd/es/locale/es_ES';
import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route } from 'react-router-dom';
import { Loading, RoutesWithNotFound } from './components';
import { colors } from './models';
import { store } from './redux';
import { PrivateRotes, PublicRotes } from './models/route';
import { AuthGuard } from './guards';

const SignIn = lazy(() => import('@/pages/sign-in/SignIn'));

export default function App() {
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
                                    <Route path={`${PrivateRotes.PRIVATE}/*`} element={<>Private</>} />
                                </Route>
                            </RoutesWithNotFound>
                        </HashRouter>
                    </ConfigProvider>
                </Provider>
            </Suspense>
        </React.StrictMode>
    );
}
