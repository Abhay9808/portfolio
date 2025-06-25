import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EditPortfolio from './pages/EditPortfolio';
import PublicPortfolio from './pages/PublicPortfolio';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/edit" element={<ProtectedRoute><EditPortfolio /></ProtectedRoute>} />
                <Route path="/portfolio/:id" element={<PublicPortfolio />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
