// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
                    <img src="/logos/logo.png" alt="Logo" width="24" height="24" className="d-inline-block align-text-top me-2" />
                    <h6 className='d-inline-block m-0'>SIMS PPOB</h6>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/top-up' ? 'fw-bold text-danger' : ''}`}
                                to="/top-up"
                            >
                                Top Up
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/transactions' ? 'fw-bold text-danger' : ''}`}
                                to="/transactions"
                            >
                                Transaction
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/profile' ? 'fw-bold text-danger' : ''}`}
                                to="/profile"
                            >
                                Akun
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
