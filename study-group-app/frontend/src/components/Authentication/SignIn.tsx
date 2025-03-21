import React, { useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();
    if (!auth) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    const { setAuth } = auth;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError('');
            const response = await axios.post('/auth', { username, password }, { withCredentials: true });
            if (response.status === 200){
                const accessToken = response.data.accessToken;
                setAuth({username, accessToken});
                navigate('/homepage');
            }
        } catch (err) {
            console.log(err);
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label className="input-label">Username</label>
                    <TextField
                        id="username"
                        value={username}
                        variant="outlined"
                        placeholder='Enter your username'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div className='input-container'>
                    <label className="input-label">Password</label>
                    <TextField
                        id="password"
                        type="password"
                        value={password}
                        placeholder='Enter your password'
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <Button type="submit" variant="contained" className='submit-button' >
                    Sign In
                </Button>
            </form>
        </div>
    );
};

export default SignIn;