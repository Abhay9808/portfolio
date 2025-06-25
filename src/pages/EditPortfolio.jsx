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

    const handleChange = e => {
        setPortfolio({ ...portfolio, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            ...portfolio,
            skills: portfolio.skills.split(','),
            certifications: portfolio.certifications.split(','),
            projects: portfolio.projects.split(','),
            education: portfolio.education.split(','),
            experience: portfolio.experience.split(',')
        };
        try {
            const res = await API.post('/portfolio/save', data);
            alert('Portfolio saved!');
        } catch (err) {
            alert('Failed to save portfolio.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get('/portfolio/my');
                const data = res.data;
                setPortfolio({
                    ...data,
                    skills: data.skills.join(','),
                    certifications: data.certifications.join(','),
                    projects: data.projects.join(','),
                    education: data.education.join(','),
                    experience: data.experience.join(',')
                });
            } catch (err) {
                console.log('No portfolio found yet.');
            }
        };
        fetchData();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Portfolio</h2>
            <textarea name="summary" placeholder="Summary" value={portfolio.summary} onChange={handleChange} />
            <input name="skills" placeholder="Skills (comma separated)" value={portfolio.skills} onChange={handleChange} />
            <input name="certifications" placeholder="Certifications" value={portfolio.certifications} onChange={handleChange} />
            <input name="projects" placeholder="Projects" value={portfolio.projects} onChange={handleChange} />
            <input name="education" placeholder="Education" value={portfolio.education} onChange={handleChange} />
            <input name="experience" placeholder="Experience" value={portfolio.experience} onChange={handleChange} />
            <input name="linkedIn" placeholder="LinkedIn URL" value={portfolio.linkedIn} onChange={handleChange} />
            <input name="gitHub" placeholder="GitHub URL" value={portfolio.gitHub} onChange={handleChange} />
            <button type="submit">Save</button>
        </form>
    );
}

export default EditPortfolio;
