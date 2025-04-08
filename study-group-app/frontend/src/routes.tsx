import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/Authentication/RequireAuth';
import Authentication from './pages/Authentication';
import HomePage from './pages/HomePage';
import MeetingRoom from './pages/MeetingRoom';
import DashboardPage from './pages/Dashboard';


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/auth" element={<Authentication />} />

            {/* Add path that requires authetication to be access */}
            <Route element={<RequireAuth />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/room/:roomId" element={<MeetingRoom/>} />
            <Route path="/dashboard" element={<DashboardPage />} />
            </Route>

            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    );
};

export default AppRoutes;