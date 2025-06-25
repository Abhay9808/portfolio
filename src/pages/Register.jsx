import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {
    const [form, setForm] = useState({ fullName: '', username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', form);
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
            <h2>Register</h2>
            <input name="fullName" placeholder="Full Name" onChange={handleChange} required /><br />
            <input name="username" placeholder="Username" onChange={handleChange} required /><br />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
