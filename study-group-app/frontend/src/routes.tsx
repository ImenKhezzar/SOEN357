import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/auth" element={<Authentication />} />
        </Routes>
    );
};

export default AppRoutes;