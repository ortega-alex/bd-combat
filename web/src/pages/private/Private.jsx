import { Icon, Loading, Nav, RoutesWithNotFound } from '@/components';
import { PrivateRotes } from '@/models/route';
import { Menu } from 'antd';
import { lazy, useState } from 'react';
import { Link, Navigate, Route } from 'react-router-dom';

const User = lazy(() => import('./maintenance/user/User'));

export default function Private() {
    const [loading, setLoading] = useState(false);

    const items = [
        {
            key: 1,
            icon: <Icon.Cog size='1.5rem' />,
            label: 'Mantenimientos',
            children: [
                {
                    key: '1-1',
                    icon: <Icon.User />,
                    label: (
                        <Link to={PrivateRotes.USER}>
                            <span>Usuarios</span>
                        </Link>
                    )
                }
            ]
        }
    ];

    return (
        <div className='vh-100 flex flex-column'>
            <Nav />
            <div className='bg-white-light flex-1 flex flex-row'>
                <div className='flex items-center'>
                    <Menu
                        mode='inline'
                        className='bg-primary text-white'
                        inlineCollapsed={true}
                        style={{ width: '2.5em', fontSize: '1.5rem', borderRadius: '0 8px 8px 0', padding: '16px 0px' }}
                        items={items}
                    />
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <RoutesWithNotFound>
                        <Route path='/' element={<Navigate to={PrivateRotes.HOME} />} />
                        <Route
                            path={PrivateRotes.HOME}
                            element={
                                <div className='w-100 flex justify-center items-center flex-column'>
                                    <small className='mt-3 h4 text-secondary-dark'>Bienvenido</small>
                                </div>
                            }
                        />
                        <Route path={PrivateRotes.USER} element={<User />} />
                    </RoutesWithNotFound>
                )}
            </div>
        </div>
    );
}
