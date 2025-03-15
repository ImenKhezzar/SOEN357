import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError('');
            const response = await axios.post('http://localhost:3000/auth', { username, password });
            // localStorage.setItem('token', response.data.accessToken);
            console.log(response);
            if (response.status === 200){
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