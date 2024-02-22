import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./styles/Signup.css";
import BannerImage from "./assets/bg.jpg";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/register', formData);
            console.log(response.data.message);
            // Redirect to login page after successful registration
            navigate('/login');
        } catch (error) {
            console.error('Error registering: ', error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: `url(${BannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="square-cycle">
                <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <br />
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <br />
                        <input type="text" name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <br />
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <br />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit">Register</button>
                    <p>Already have an account? <a href="/login">Go to Login</a></p>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
