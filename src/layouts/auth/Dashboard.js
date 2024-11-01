// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Saldo from '../components/Saldo';
import { useSelector } from 'react-redux';

const Dashboard = () => {

    const token = useSelector((state) => state.auth.token);

    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [banner, setBanner] = useState(null);
    const [error, setError] = useState(null);

    const handleServiceClick = (service) => {
        navigate('/payment', { state: { service } });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };

                // Fetch services
                const servicesResponse = await fetch(`${process.env.REACT_APP_API_URL}/services`, { headers });
                if (!servicesResponse.ok) throw new Error('Services fetch failed');
                const servicesData = await servicesResponse.json();
                setServices(servicesData.data);

                // Fetch banner
                const bannerResponse = await fetch(`${process.env.REACT_APP_API_URL}/banner`, { headers });
                if (!bannerResponse.ok) throw new Error('Banner fetch failed');
                const bannerData = await bannerResponse.json();
                setBanner(bannerData.data);

            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ marginBottom: "250px" }}>
            <div className="container mt-5">
                <Saldo />
                {services.length > 0 && (
                    <div className='w-100 d-flex my-5 overflow-x-auto overflow-y-hidden'>
                        {services.map((s, i) => (
                            <div key={i} role='button' className='mx-3 text-center' onClick={() => handleServiceClick(s)}>
                                <img src={s.service_icon} alt={s.service_name} />
                                <small style={{ fontSize: "12px" }}>{s.service_name}</small>
                            </div>
                        ))}
                    </div>
                )}
                {banner &&
                    <>
                        <h6>Temukan Promo Menarik</h6>
                        <div className='w-100 d-flex overflow-x-auto overflow-y-hidden'>
                            {banner.map((b, i) => (
                                <div key={i} className='mx-3 text-center'>
                                    <img src={b.banner_image} alt={b.banner_name} />
                                </div>
                            ))}
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Dashboard;
