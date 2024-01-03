import { PublicRotes } from '@/models/route';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard = () => {
    const sessionState = useSelector(state => state.session);
    return sessionState ? <Outlet /> : <Navigate replace to={PublicRotes.SIGN_IN} />;
};

export default AuthGuard;
