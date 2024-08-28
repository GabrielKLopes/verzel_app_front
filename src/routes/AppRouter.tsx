import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';

import { AuthService } from '../services/Auth.service';
import Favorites from '../pages/Favorites';

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = AuthService.getToken();
    if (!token) {
      navigate('/'); 
    }
  }, [navigate]);

  return <>{element}</>;
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/movie/:id" element={<ProtectedRoute element={<MovieDetails />} />} />
        <Route path="/favorites" element={<ProtectedRoute element={<Favorites />} />} /> 
      </Routes>
    </Router>
  );
};

export default AppRouter;
