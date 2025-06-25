import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EditPortfolio from './pages/EditPortfolio';
import PublicPortfolio from './pages/PublicPortfolio';
import UploadResume from './pages/UploadResume';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/edit" element={<ProtectedRoute><EditPortfolio /></ProtectedRoute>} />
                <Route path="/upload" element={<ProtectedRoute><UploadResume /></ProtectedRoute>} />
                <Route path="/portfolio/:id" element={<PublicPortfolio />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
