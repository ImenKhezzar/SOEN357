import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Button from '@mui/material/Button';
import useAuth from "../hooks/useAuth";
import '../App.css'; 

const Logout = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const authContext = useAuth();
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    const { setAuth } = authContext;


    const handleLogout = async () => {
        try {
            const response = await axiosPrivate.get('/logout'); 
            if(response.status === 204){
                setAuth(null);
                navigate('/auth');
            }
        } catch (err) {
            console.error('Failed to logout', err);
        }
    };

    return (
        <div className="logout-button">
            <Button variant="contained" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};

export default Logout;