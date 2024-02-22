import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginValidation';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            console.log(response.data.message);
            setError('');
        } catch (error) {
            console.error('Error logging in: ', error);
            setError('Invalid username or password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default LoginForm;
