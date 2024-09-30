import React from 'react';
import { approveTransaction, rejectTransaction } from '../services/api';

const TransactionTable = ({ transactions, userRole, onUpdateTransaction }) => {
    const handleApprove = async (id) => {
        try {
            const response = await approveTransaction(id);
            onUpdateTransaction(response.data);
        } catch (err) {
            console.error('Error approving transaction', err);
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await rejectTransaction(id);
            onUpdateTransaction(response.data);
        } catch (err) {
            console.error('Error rejecting transaction', err);
        }
    };

    return (
        <table className="transaction-table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Status</th>
                    {userRole === 'Manager' && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                        <td>{transaction.type}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.status}</td>
                        {userRole === 'Manager' && transaction.status === 'Pending' && (
                            <td>
                                <button onClick={() => handleApprove(transaction._id)}>Approve</button>
                                <button onClick={() => handleReject(transaction._id)}>Reject</button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionTable;
