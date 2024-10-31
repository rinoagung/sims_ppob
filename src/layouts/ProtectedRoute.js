// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');

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
    const isAuthenticated = !!localStorage.getItem('token');

    return !isAuthenticated ? (
        <>
            {children}
        </>
    ) : (
        <Navigate to="/dashboard" />
    );
};

export { ProtectedRoute, GuestRoute };
