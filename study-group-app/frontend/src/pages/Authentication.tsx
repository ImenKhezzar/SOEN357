import React, { useState } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import '../App.css';
const Authentication: React.FC = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div className="authentication-container">
            <div className="white-box" style={{ width: '70vw', height: '50vh' }}>
            <div className="toggle-buttons">
                <button onClick={() => setIsSignIn(true)} disabled={isSignIn}>
                    Sign In
                </button>
                <button onClick={() => setIsSignIn(false)} disabled={!isSignIn}>
                    Sign Up
                </button>
            </div>
            {isSignIn ? <SignIn /> : <SignUp />}
            </div>
        </div>
    );
};

export default Authentication;