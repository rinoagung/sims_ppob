// src/layouts/components/Saldo.js
import React, { useState, useEffect } from 'react';
import { formatAngka } from '../../utils/formatAngka';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSeeBalance } from '../../redux/slices/balanceSlice';



const Saldo = () => {

    const [profile, setProfile] = useState(null);
    const [balance, setBalance] = useState("0");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();


    const seeBalance = useSelector((state) => state.balance.seeBalance);



    const isValidImageUrl = (url) => {
        return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(url);
    };

    const profile_image_url = profile && isValidImageUrl(profile.profile_image) ? profile.profile_image : '/logos/profile.png';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };

                // Fetch profile
                const profileResponse = await fetch(`${process.env.REACT_APP_API_URL}/profile`, { headers });
                if (!profileResponse.ok) throw new Error('Profile fetch failed');
                const profileData = await profileResponse.json();
                setProfile(profileData.data);

                // Fetch balance
                const balanceResponse = await fetch(`${process.env.REACT_APP_API_URL}/balance`, { headers });
                if (!balanceResponse.ok) throw new Error('Balance fetch failed');
                const balanceData = await balanceResponse.json();
                setBalance(balanceData.data.balance);

            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='row mb-5'>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="col-5">
                <img
                    src={profile_image_url}
                    alt="Profile"
                    className="rounded-circle mb-3"
                    style={{ width: '80px', height: '80px' }}
                />
                <p className='m-0'>Selamat datang,</p>
                <h4>{profile && `${profile.first_name} ${profile.last_name}`}</h4>
            </div>
            <div className="col-6 ms-auto bg-danger mx-3 text-white p-3 rounded-4">
                <p>Saldo Anda</p>
                <h4>Rp{seeBalance ? formatAngka(balance) : " ● ● ● ● ● ●"}</h4>
                <small
                    role='button'
                    className='d-block mt-4'
                    onClick={() => dispatch(toggleSeeBalance())}
                >
                    {seeBalance ? "Sembunyikan" : "Lihat"} Saldo <i className={`bi bi-eye${seeBalance ? "-slash" : ""}`}></i>
                </small>
            </div>
        </div>
    );
};

export default Saldo;
