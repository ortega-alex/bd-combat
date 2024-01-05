import React from 'react';
import { Route, Routes } from 'react-router-dom';

export function RoutesWithNotFound({ children }) {
    return (
        <Routes>
            {children}
            <Route
                path='*'
                element={
                    <div className='flex flex-1 flex-column justify-center items-center vh-85 '>
                        <h1>404</h1>
                        <p>Page Not Fount</p>
                    </div>
                }
            />
        </Routes>
    );
}

export default RoutesWithNotFound;
