import { useEffect, useState } from 'react';
import API from '../services/api';

function Dashboard() {
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        API.get('/portfolio/my')
            .then(res => setPortfolio(res.data))
            .catch(() => setPortfolio(null));
    }, []);

    if (!portfolio) return <p style={{ padding: '20px' }}>No portfolio found. Go to Edit page to create one.</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Your Portfolio Summary</h2>
            <p><strong>Summary:</strong> {portfolio.summary}</p>
            <p><strong>Skills:</strong> {portfolio.skills.join(', ')}</p>
            <p><strong>Projects:</strong> {portfolio.projects.join(', ')}</p>
            <p><strong>LinkedIn:</strong> {portfolio.linkedIn}</p>
        </div>
    );
}

export default Dashboard;
