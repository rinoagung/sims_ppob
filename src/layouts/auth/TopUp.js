// src/components/TopUp.js
import React, { useState } from 'react';
import Saldo from '../components/Saldo';
import Swal from 'sweetalert2';
import { formatAngka } from '../../utils/formatAngka';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBannerData } from '../../redux/slices/bannerSlice';


const TopUp = () => {

    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState('');

    const handleConfirm = async (e) => {
        e.preventDefault();

        Swal.fire({
            html: `<div class='text-center'>
                    <p>Anda yakin ingin Top Up Sebesar</p>
                    <h5 class='fw-bold'>Rp${formatAngka(amount)} ?</h5>
                </div>`,
            showCancelButton: true,
            confirmButtonText: "Ya, Lanjutkan Top Up",
            cancelButtonText: "Batalkan",
            confirmButtonColor: "#f42619",
            cancelButtonColor: "#7D8492",
        }).then((result) => {
            if (result.isConfirmed) {
                handleTopUp()
            }
        });
    }

    const handleTopUp = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/topup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ top_up_amount: amount }),
            });

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    showConfirmButton: false,
                    html: `<div class='text-center'>
                    <p>Top up Sebesar</p>
                    <h5 class='fw-bold'>Rp${formatAngka(amount)}</h5>
                    <p>Berhasil</p>
                    <a href='/dashboard' class='text-decoration-none text-danger fw-bold' > Kembali ke Beranda </a>
                </div>`
                });
                dispatch(fetchBannerData());
            } else {
                Swal.fire({
                    icon: "error",
                    showConfirmButton: false,
                    html: `<div class='text-center'>
                    <p>Top up Sebesar</p>
                    <h5 class='fw-bold'>Rp${formatAngka(amount)}</h5>
                    <p>Gagal</p>
                    <a href='/dashboard' class='text-decoration-none text-danger fw-bold' > Kembali ke Beranda </a>
                </div>`
                });
            }
        } catch (err) {
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <Saldo />
                <p>Silakan Masukan</p>
                <h3>Nominal Top Up</h3>
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
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className={`btn btn-${!amount ? "secondary" : "danger"} w-100`} disabled={!amount}>Top Up</button>
                    </form>
                </div>
                <div className="col-lg-5 col-12 mt-3 row">
                    <div className="col-4 my-2"><button className='btn btn-transparent border border-1' style={{ width: "120px" }} onClick={() => setAmount(10000)}>Rp10.000</button></div>
                    <div className="col-4 my-2"><button className='btn btn-transparent border border-1' style={{ width: "120px" }} onClick={() => setAmount(20000)}>Rp20.000</button></div>
                    <div className="col-4 my-2"><button className='btn btn-transparent border border-1' style={{ width: "120px" }} onClick={() => setAmount(50000)}>Rp50.000</button></div>
                    <div className="col-4 my-2"><button className='btn btn-transparent border border-1' style={{ width: "120px" }} onClick={() => setAmount(100000)}>Rp100.000</button></div>
                    <div className="col-4 my-2"><button className='btn btn-transparent border border-1' style={{ width: "120px" }} onClick={() => setAmount(250000)}>Rp250.000</button></div>
                    <div className="col-4 my-2"><button className='btn btn-transparent border border-1' style={{ width: "120px" }} onClick={() => setAmount(500000)}>Rp500.000</button></div>
                </div>
            </div>
        </div>
    );
};

export default TopUp;
