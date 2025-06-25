import { useEffect, useState } from 'react';
import API from '../services/api';

function EditPortfolio() {
    const [portfolio, setPortfolio] = useState({
        summary: '',
        skills: '',
        certifications: '',
        projects: '',
        education: '',
        experience: '',
        linkedIn: '',
        gitHub: ''
    });

    const handleChange = (e) => {
        setPortfolio({ ...portfolio, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            ...portfolio,
            skills: portfolio.skills.split(',').map(s => s.trim()),
            certifications: portfolio.certifications.split(',').map(c => c.trim()),
            projects: portfolio.projects.split(',').map(p => p.trim()),
            education: portfolio.education.split(',').map(e => e.trim()),
            experience: portfolio.experience.split(',').map(e => e.trim())
        };

        try {
            await API.post('/portfolio/save', data);
            alert('Portfolio saved successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to save portfolio');
        }
    };

    useEffect(() => {
        API.get('/portfolio/my')
            .then((res) => {
                const p = res.data;
                setPortfolio({
                    summary: p.summary || '',
                    skills: p.skills ? p.skills.join(', ') : '',
                    certifications: p.certifications ? p.certifications.join(', ') : '',
                    projects: p.projects ? p.projects.join(', ') : '',
                    education: p.education ? p.education.join(', ') : '',
                    experience: p.experience ? p.experience.join(', ') : '',
                    linkedIn: p.linkedIn || '',
                    gitHub: p.gitHub || ''
                });
            })
            .catch(() => {
                console.log('No existing portfolio. Creating new.');
            });
    }, []);

    return (
        <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
            <h2>Edit Your Portfolio</h2>

            <textarea name="summary" placeholder="Summary" value={portfolio.summary} onChange={handleChange} rows={4} /><br />

            <input name="skills" placeholder="Skills (comma-separated)" value={portfolio.skills} onChange={handleChange} /><br />
            <input name="certifications" placeholder="Certifications" value={portfolio.certifications} onChange={handleChange} /><br />
            <input name="projects" placeholder="Projects" value={portfolio.projects} onChange={handleChange} /><br />
            <input name="education" placeholder="Education" value={portfolio.education} onChange={handleChange} /><br />
            <input name="experience" placeholder="Experience" value={portfolio.experience} onChange={handleChange} /><br />
            <input name="linkedIn" placeholder="LinkedIn URL" value={portfolio.linkedIn} onChange={handleChange} /><br />
            <input name="gitHub" placeholder="GitHub URL" value={portfolio.gitHub} onChange={handleChange} /><br />

            <button type="submit">Save Portfolio</button>
        </form>
    );
}

export default EditPortfolio;
