// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './layouts/guest/RegistrationForm';
import LoginForm from './layouts/guest/LoginForm';

import Dashboard from './layouts/auth/Dashboard';
import Profile from './layouts/auth/Profile';
import TopUp from './layouts/auth/TopUp';
import Transactions from './layouts/auth/Transactions';
import Payment from './layouts/auth/Payment';

import { ProtectedRoute, GuestRoute } from './layouts/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<GuestRoute> <RegistrationForm /> </GuestRoute>} />
                <Route path="/" element={<GuestRoute> <LoginForm /> </GuestRoute>} />

                <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/top-up" element={<ProtectedRoute><TopUp /></ProtectedRoute>} />
                <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
