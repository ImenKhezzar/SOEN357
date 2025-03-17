import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';
import HomePage from './pages/HomePage';


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/HomePage" element={<HomePage/>} />
        </Routes>
    );
};

export default AppRoutes;