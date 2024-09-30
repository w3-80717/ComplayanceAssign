import React, { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import { getTransactions } from '../services/api';

const Dashboard = ({ userRole }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransactions();
                setTransactions(response.data);
            } catch (err) {
                console.error('Error fetching transactions', err);
            }
        };
        fetchTransactions();
    }, []);

    const handleTransactionSubmit = (newTransaction) => {
        setTransactions([...transactions, newTransaction]);
    };

    const handleUpdateTransaction = (updatedTransaction) => {
        setTransactions(
            transactions.map((t) => (t._id === updatedTransaction._id ? updatedTransaction : t))
        );
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            {userRole === 'Employee' && (
                <TransactionForm onTransactionSubmit={handleTransactionSubmit} />
            )}
            <TransactionTable
                transactions={transactions}
                userRole={userRole}
                onUpdateTransaction={handleUpdateTransaction}
            />
        </div>
    );
};

export default Dashboard;

     