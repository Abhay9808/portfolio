import { useState } from 'react';
import API from '../services/api';

function UploadResume() {
    const [file, setFile] = useState(null);
    const [portfolio, setPortfolio] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await API.post("/resume/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setPortfolio(res.data);
        } catch (err) {
            console.error(err);
            alert("Resume parsing failed");
        }
    };

    return (
        <div style={{ padding: '30px' }}>
            <h2>Upload Resume (PDF or DOCX)</h2>
            <input type="file" accept=".pdf,.docx" onChange={handleFileChange} /><br />
            <button onClick={handleUpload}>Upload & Parse</button>

            {portfolio && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Extracted Portfolio:</h3>
                    <pre>{JSON.stringify(portfolio, null, 2)}</pre>
                    <p>You can now copy this into the Edit page</p>
                </div>
            )}
        </div>
    );
}

export default UploadResume;
