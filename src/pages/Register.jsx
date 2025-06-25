import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ fullName: '', email: '', username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await API.post('/auth/register', form);
            alert('Registered successfully! Please login.');
            navigate('/login');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
