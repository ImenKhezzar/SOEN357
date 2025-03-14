import React, { useState } from 'react';
import axios from 'axios';
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
            const response = await axios.post('http://localhost:3000/register', { username, password, name, email, age });
            console.log(response);
            // TODO: either reload and ask user to auth or do auth here and navigate to hompage
            navigate('/auth');
        } catch (err) {
            setError('Failed to register');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='input-label'>Username</label>
                    <TextField
                        id="username"
                        value={username}
                        variant="outlined"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        margin="normal"
                    />
                    <label className='input-label'>Age</label>
                    <TextField
                        id="age"
                        value={age}
                        variant="outlined"
                        onChange={(e) => setAge(e.target.value)}
                        required
                        margin="normal"
                    />
                </div>
                <div>
                    <label className='input-label'>Password</label>
                    <TextField
                        id="password"
                        type="password"
                        value={password}
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        margin="normal"
                    />
                </div>
                <div>
                    <label className='input-label'>Name</label>
                    <TextField
                        id="name"
                        value={name}
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        required
                        margin="normal"
                    />
                </div>
                <div>
                    <label className='input-label'>Email</label>
                    <TextField
                        id="email"
                        type="email"
                        value={email}
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        margin="normal"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <Button type="submit" variant="contained" color="primary">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignUp;