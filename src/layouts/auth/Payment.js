// src/components/Payment.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import Saldo from '../components/Saldo';
import { formatAngka } from '../../utils/formatAngka';

const Payment = () => {
    const location = useLocation();
    const balance = useSelector((state) => state.balance.balance);
    const dispatch = useDispatch();

    const { service } = location.state || {};

    const handleConfirm = async (e) => {
        e.preventDefault();
        Swal.fire({
            html: `<div class='text-center'>
                    <p>Anda yakin ingin Pembayaran Sebesar</p>
                    <h5 class='fw-bold'>Rp${formatAngka(service.service_tariff)}</h5>
                </div>`,
            showCancelButton: true,
            confirmButtonText: "Ya, Lanjutkan Pembayaran",
            cancelButtonText: "Batalkan",
            confirmButtonColor: "#f42619",
            cancelButtonColor: "#7D8492",
        }).then((result) => {
            if (result.isConfirmed) {
                handlePayment()
            }
        });
    }


    const handlePayment = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ service_code: service.service_code }),
            });

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    showConfirmButton: false,
                    html: `<div class='text-center'>
                    <p>Pembayaran Sebesar</p>
                    <h5 class='fw-bold'>Rp${formatAngka(service.service_tariff)}</h5>
                    <p>Berhasil</p>
                    <a href='/dashboard' class='text-decoration-none text-danger fw-bold' > Kembali ke Beranda </a>
                </div>`
                });

            } else {
                alert(data.message || 'Pembayaran failed');
            }
        } catch (err) {
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='container mt-5'>
            <Saldo />
            <p>Pembayaran</p>
            {service ? (
                <div className='row'>
                    <div className='d-flex'>
                        <img src={service.service_icon} alt="Logo" width="24" height="24" className="d-inline-block align-text-top me-2" />
                        <h6>{service.service_name}</h6>
                    </div>
                    <div className="col-lg-7 col-12">
                        <form onSubmit={handleConfirm}>
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label">Amount</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-cash"></i></span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="amount"
                                        value={service.service_tariff}
                                        required
                                        disabled
                                    />
                                </div>
                            </div>
                            <button type="submit" className={`btn btn-danger w-100`}>Bayar</button>
                        </form>
                    </div>
                </div>
            ) : (
                <p>No service selected.</p>
            )}
        </div>
    );
};

export default Payment;
