// src/components/Transactions.js
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Saldo from '../components/Saldo';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(5);

    const fetchTransactions = async (limit = 5) => {
        try {
            setLimit(limit)
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/transaction/history?offset=0&limit=${limit}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch transactions');
            }

            const data = await response.json();
            setTransactions(data.data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="container my-5">
            <Saldo />
            <h5>Semua Transaksi</h5>

            {transactions && transactions.records > 0 ? (
                <>
                    <ul className="list-group">
                        {transactions.records.map((t) => (
                            <li key={t.id} className="mb-4 border rounded-3 list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <p className={`fw-bold m-0 text-${t.transaction_type == "TOPUP" ? "success" : "danger"}`}>{t.transaction_type == "TOPUP" ? "+" : "-"} {t.total_amount}</p>
                                    <small>{format(new Date(t.created_on), 'dd MMMM yyyy, HH:mm')}</small>
                                </div>
                                <small className='m-0 '>{t.description}</small>
                            </li>
                        ))}
                    </ul>
                    <div className='d-flex justify-content-center mt-5'>
                        <button type='button' onClick={() => { fetchTransactions(limit + 5) }} className='bg-transparent border-0 text-danger m-auto'>Show more</button>
                    </div>
                </>
            ) : (
                <p className='text-center mt-5'>No transactions found.</p>
            )}
        </div>
    );
};

export default Transactions;
