import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            alert('Login successful');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
            <h2>Login</h2>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
