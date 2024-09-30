import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                email,
                password,
            });
            console.log('Login successful:', response.data);
            onLogin(response.data);  
            setError(null);
        } catch (err) {
            console.error('Login failed:', err.response.data);
            setError(err.response.data.message || 'Failed to log in. Please try again.');
        }
    };

    return (
        <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
    );
};

export default LoginPage;
