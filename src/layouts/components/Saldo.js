// src/layouts/components/Saldo.js
import React, { useState, useEffect } from 'react';
import { formatAngka } from '../../utils/formatAngka';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSeeBalance } from '../../redux/slices/balanceSlice';
import { fetchBannerData } from '../../redux/slices/bannerSlice';



const Saldo = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.banner.profile);
    const balance = useSelector((state) => state.banner.balance);
    const error = useSelector((state) => state.banner.error);

    useEffect(() => {
        dispatch(fetchBannerData());
    }, [dispatch]);

    const seeBalance = useSelector((state) => state.balance.seeBalance);

    const isValidImageUrl = (url) => {
        return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(url);
    };

    const profile_image_url = profile && isValidImageUrl(profile.profile_image) ? profile.profile_image : '/logos/profile.png';


    return (
        <div className='row mb-5'>
            {error && <div className="alert alert-danger alert-dismissible">
                {error}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
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
