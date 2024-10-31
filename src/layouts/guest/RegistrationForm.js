// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setError } from '../../redux/slices/userSlice';

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.user.error);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(setError(null));

        if (formData.password !== formData.confirmPassword) {
            dispatch(setError('Password does not match'));
            return;
        }

        const { email, firstName, lastName, password } = formData;

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, first_name: firstName, last_name: lastName, password }),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(registerUser(data));
                setSuccessMessage(data.message);
            } else {
                dispatch(setError(data.message || 'Registration failed'));
            }
        } catch (error) {
            dispatch(setError('An error occurred. Please try again.'));
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <form className="col-12 p-5 col-lg-6 p-0 d-flex justify-content-center flex-column align-items-center" style={{ height: "100vh" }} onSubmit={handleSubmit}>
                    {successMessage && <div className="alert alert-success w-100" role="alert">{successMessage}</div>}
                    {error && <div className="alert alert-danger w-100" role="alert">{error}</div>}
                    <div>
                        <img src="/logos/logo.png" alt="Logo" width="24" height="24" className="d-inline-block align-text-top me-2" />
                        <h6 className='d-inline-block m-0'>SIMS PPOB</h6>
                    </div>
                    <div className='my-5'>
                        <h4 className='text-center'>Lengkapi data untuk <br /> membuat akun</h4>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input type="email" className='form-control' name="email" value={formData.email} placeholder='masukan email Anda' onChange={handleChange} required />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-person"></i></span>
                        <input type="text" className='form-control' name="firstName" value={formData.firstName} placeholder='nama depan' onChange={handleChange} required />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-person"></i></span>
                        <input type="text" className='form-control' name="lastName" value={formData.lastName} placeholder='nama belakang' onChange={handleChange} required />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-lock"></i></span>
                        <input type={showPassword ? 'text' : 'password'} className='form-control' name="password" value={formData.password} placeholder='buat password' onChange={handleChange} required />
                        <button className="btn border border-start-0" type="button" onClick={() => setShowPassword(!showPassword)}>{!showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}</button>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-lock"></i></span>
                        <input type={showConfirmPassword ? 'text' : 'password'} className='form-control' name="confirmPassword" value={formData.confirmPassword} placeholder='konfirmasi password' onChange={handleChange} required />
                        <button className="btn border border-start-0" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{!showConfirmPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}</button>
                    </div>

                    <button type="submit" className="btn btn-danger w-100">Registrasi</button>
                    <small className='mt-5'>Sudah punya akun? Login <a href="/" className='text-decoration-none text-danger fw-bold'>di sini</a></small>
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

export default RegistrationForm;
