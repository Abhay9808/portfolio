import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';
import html2pdf from 'html2pdf.js';

function PublicPortfolio() {
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await API.get(`/portfolio/public/${id}`);
                setPortfolio(res.data);
            } catch (err) {
                console.error('Portfolio not found.');
            }
        };
        fetchPortfolio();
    }, [id]);

    const handleDownload = () => {
        const element = document.getElementById('portfolio-pdf');
        html2pdf().from(element).save(`${portfolio.email}_resume.pdf`);
    };

    if (!portfolio) return <p>Loading portfolio...</p>;

    return (
        <div>
            <div id="portfolio-pdf">
                <h2>Portfolio of {portfolio.email}</h2>
                <p><strong>Summary:</strong> {portfolio.summary}</p>
                <p><strong>Skills:</strong> {portfolio.skills.join(', ')}</p>
                <p><strong>Certifications:</strong> {portfolio.certifications.join(', ')}</p>
                <p><strong>Projects:</strong> {portfolio.projects.join(', ')}</p>
                <p><strong>Education:</strong> {portfolio.education.join(', ')}</p>
                <p><strong>Experience:</strong> {portfolio.experience.join(', ')}</p>
                <p><strong>LinkedIn:</strong> <a href={portfolio.linkedIn}>{portfolio.linkedIn}</a></p>
                <p><strong>GitHub:</strong> <a href={portfolio.gitHub}>{portfolio.gitHub}</a></p>
            </div>
            <button onClick={handleDownload}>Download as PDF</button>
        </div>
    );
}

export default PublicPortfolio;
