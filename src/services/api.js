import axios from 'axios';

const API = axios.create({
	baseURL: 'https://portfolioappapi-anghg3fpa3gbapg8.canadacentral-01.azurewebsites.net/api',
});

API.interceptors.request.use((req) => {
	const token = localStorage.getItem('token');
	if (token) req.headers.Authorization = `Bearer ${token}`;
	return req;
});

export default API;
