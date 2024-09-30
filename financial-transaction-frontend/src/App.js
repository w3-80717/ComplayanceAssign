import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';  

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        localStorage.setItem('token', userData.token);
        setUser({ role: userData.role });
    };

    return (
        <Router>
            <div className="app">
                <Routes>
                  
                    {!user ? (
                        <>
                           <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                          
                            <Route path="/signup" element={<SignUp />} />
                           
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    ) : (
                        <>
                           
                            <Route path="/dashboard" element={<Dashboard userRole={user.role} />} />
                           
                            <Route path="*" element={<Navigate to="/dashboard" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
