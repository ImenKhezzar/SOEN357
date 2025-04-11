import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import dancingImg from '../../assets/Dancing.png';
import Button from '@mui/material/Button';

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div style={{ display: 'flex', height: '100%', borderRadius: '10px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            {/* Left Section */}
            <div style={{ flex: 1, backgroundColor: '#927AF4', justifyContent: 'center', alignItems: 'center',borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', padding: '2em'}}>
                <h3 style={{color: 'white'}}> Start your Journey with us </h3>
                <p style={{color: '#e0e7ff'}}>Join thousands of students who are already using StudyRoom to improve their study habits</p>
                <img src={dancingImg} alt="Logo" style={{ width: '100%', height: 'auto', marginTop: '2em' }} />
            </div>

            {/* Right Section */}
            <div style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', padding: '2em'}}>
            {isSignIn ? 
            (<div style={{ position: 'relative', }}>
                <div style={{ marginBottom: '5em'}}>
                    <h3> Welcome Back! </h3>
                    <p>Please enter your details to sign in</p>
                </div>
                <SignIn />
                <div style={{marginTop: '2em', textAlign: 'center'}}> 
                 Don't have an account? 
                <Button 
                    variant="text" 
                    onClick={() => setIsSignIn(false)}
                    style={{ textTransform: 'none', color: '#78CFEB'}}
                >
                    Sign Up
                </Button>
                </div>
            </div>) : (
                <div style={{ position: 'relative', }}>
                 <div style={{ marginBottom: '1em'}}>
                 <h3> Welcome! </h3>
                 <p>Please enter your details to sign up</p>
             </div>
                <SignUp />
                <div style={{marginTop: '2em', textAlign: 'center'}}> 
                 Already have an account? 
                <Button 
                    variant="text" 
                    onClick={() => setIsSignIn(true)}
                    style={{ textTransform: 'none', color: '#78CFEB'}}
                >
                    Sign In
                </Button>
                </div>
                </div>
            )}
        </div>
    </div>
    );
};

export default Auth;
