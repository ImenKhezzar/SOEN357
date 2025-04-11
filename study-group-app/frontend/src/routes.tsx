import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/Authentication/RequireAuth";
import HomePage from "./pages/HomePage";
import MeetingRoom from "./pages/MeetingRoom";
import Welcome from "./pages/Welcome";
import About from "./pages/About";


const AppRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/about" element={<About />} />
      
      {/* Add path that requires authetication to be access */}
      <Route element={<RequireAuth />}>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/room/:roomId" element={<MeetingRoom />} />
      </Route>

      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
