import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
                name,
                email,
                password,
                role,
            });
            console.log('Sign up successful:', response.data);
            setSuccess(true);
            setError(null);
            setName('');
            setEmail('');
            setPassword('');
            setRole('employee');
        } catch (err) {
            console.error('Sign up failed:', err);
            setError('Failed to sign up. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <div className="signup-form">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>

                <button type="submit">Sign Up</button>
            </form>

            {success && <p className="success">Sign up successful! <Link to="/login">Login here</Link></p>}
            {error && <p className="error">{error}</p>}

            {/* Link to Login */}
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default SignUp;
