import React, { useState } from 'react';
import { createTransaction } from '../services/api';

const TransactionForm = ({ onTransactionSubmit }) => {
    const [formData, setFormData] = useState({
        type: '',
        amount: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createTransaction(formData);
            onTransactionSubmit(response.data);
            setFormData({ type: '', amount: '', description: '' });
        } catch (err) {
            console.error('Error submitting transaction', err);
        }
    };

    return (
        <form className="transaction-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Type</label>
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit Transaction</button>
        </form>
    );
};

export default TransactionForm;
