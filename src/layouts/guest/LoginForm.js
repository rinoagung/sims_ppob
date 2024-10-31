// src/components/LoginForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.user.error);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.data.token);
                dispatch(setError(''));
                navigate('/dashboard');
            } else {
                dispatch(setError(data.message || 'Login failed'));
            }
        } catch (error) {
            dispatch(setError('An error occurred. Please try again.'));
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <form className="col-12 p-5 col-lg-6 p-0 d-flex justify-content-center flex-column align-items-center" style={{ height: "100vh" }} onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger alert-dismissible w-100" role="alert">
                        {error}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>}
                    <div className='text-center'>
                        <img src="/logos/logo.png" alt="Logo" width="24" height="24" className="d-inline-block align-text-top me-2" />
                        <h6 className='d-inline-block m-0'>SIMS PPOB - RINO AGUNG PRIYO UTOMO</h6>
                    </div>
                    <div className='my-5'>
                        <h4 className='text-center'>Masuk atau buat akun <br /> untuk memulai</h4>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input type="email" className='form-control' name="email" value={credentials.email} placeholder='masukan email Anda' onChange={handleChange} required />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-lock"></i></span>
                        <input type={showPassword ? 'text' : 'password'} className='form-control' name="password" value={credentials.password} placeholder='masukan password Anda' onChange={handleChange} required />
                        <button className="btn border border-start-0" type="button" onClick={() => setShowPassword(!showPassword)}>{!showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}</button>
                    </div>
                    <button type="submit" className="btn btn-danger w-100">Masuk</button>
                    <small className='mt-5'>Belum punya akun? Registrasi <a href="/register" className='text-decoration-none text-danger fw-bold'>di sini</a></small>
                </form>
                <div
                    className='col-lg-6 d-none d-lg-block overflow-hidden p-0' style={{ height: "100vh" }}
                >
                    <img src="/logos/login.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
