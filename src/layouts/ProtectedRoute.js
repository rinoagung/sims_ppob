// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {

    const token = useSelector((state) => state.auth.token);
    const isAuthenticated = !!token;

    return isAuthenticated ? (
        <>
            <Navbar />
            {children}
        </>
    ) : (
        <Navigate to="/" />
    );
};

const GuestRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);

    const isAuthenticated = !!token;

    return !isAuthenticated ? (
        <>
            {children}
        </>
    ) : (
        <Navigate to="/dashboard" />
    );
};

export { ProtectedRoute, GuestRoute };
