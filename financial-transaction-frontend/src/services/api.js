import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
};

export const createTransaction = (transactionData) => {
    return axios.post(`${API_URL}/transactions`, transactionData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

export const getTransactions = () => {
    return axios.get(`${API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

export const approveTransaction = (id) => {
    return axios.put(`${API_URL}/transactions/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};

export const rejectTransaction = (id) => {
    return axios.put(`${API_URL}/transactions/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
};
