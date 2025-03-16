import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', { username, password, name, email, age });

            if(response.status === 201){
                window.location.reload();
            }
        } catch (err) {
            setError('Failed to register');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <div className='input-container-row'>
                    <label className='input-label'>Name</label>
                    <TextField
                        id="name"
                        value={name}
                        placeholder="Enter your name"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        required
                        margin="normal"
                    />
                    </div>
                    <div className='input-container-row' style={{marginLeft: '10%'}}>
                    <label className='input-label'>Age</label>
                    <TextField
                        id="age"
                        value={age}
                        placeholder='Enter your age'
                        variant="outlined"
                        onChange={(e) => setAge(e.target.value)}
                        required
                        margin="normal"
                    />
                    </div>
                </div>
                <div className='input-container'>
                    <label className='input-label'>Username</label>
                    <TextField
                        id="username"
                        value={username}
                        placeholder='Enter your username'
                        variant="outlined"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div className='input-container'>
                    <label className='input-label'>Password</label>
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
                <div className='input-container'>
                    <label className='input-label'>Email</label>
                    <TextField
                        id="email"
                        type="email"
                        value={email}
                        placeholder='Enter your email'
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <Button type="submit" variant="contained" className='submit-button'>
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignUp;