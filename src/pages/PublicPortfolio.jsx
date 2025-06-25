import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';
import html2pdf from 'html2pdf.js';

function PublicPortfolio() {
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        API.get(`/portfolio/public/${id}`).then(res => setPortfolio(res.data));
    }, [id]);

    const downloadPDF = () => {
        html2pdf().from(document.getElementById('portfolio-view')).save(`${portfolio.email}_resume.pdf`);
    };

    if (!portfolio) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <div id="portfolio-view">
                <h2>{portfolio.fullName || portfolio.email}'s Portfolio</h2>
                <p><strong>Summary:</strong> {portfolio.summary}</p>
                <p><strong>Skills:</strong> {portfolio.skills.join(', ')}</p>
                <p><strong>Projects:</strong> {portfolio.projects.join(', ')}</p>
                <p><strong>LinkedIn:</strong> {portfolio.linkedIn}</p>
            </div>
            <button onClick={downloadPDF}>Download as PDF</button>
        </div>
    );
}

export default PublicPortfolio;
