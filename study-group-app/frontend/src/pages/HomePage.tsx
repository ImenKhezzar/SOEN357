import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import '../App.css'; 

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:3000/logout'); 
            //localStorage.removeItem('token'); 
            if(response.status === 201){
                navigate('/auth');
            }
        } catch (err) {
            console.error('Failed to logout', err);
        }
    };

    return (
        <div className="homepage-container">
            <Button variant="contained" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};

export default HomePage;