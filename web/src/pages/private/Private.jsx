import { Loading, Nav, RoutesWithNotFound } from '@/components';
import { PrivateRotes } from '@/models/route';
import React, { useState } from 'react';
import { Navigate, Route } from 'react-router-dom';

export default function Private() {
    const [loading, setLoading] = useState(false);

    return (
        <div className='hv-100 d-flex flex-column'>
            <Nav />
            <div className='bg-white-light h-container'>
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
                    </RoutesWithNotFound>
                )}
            </div>
        </div>
    );
}
