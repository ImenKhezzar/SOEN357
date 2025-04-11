import React, { useState } from 'react';
import SignIn from '../components/Authentication/SignIn';
import SignUp from '../components/Authentication/SignUp';
import '../App.css';
import logo from '../assets/image.png';
import Auth from '../components/Authentication/Auth';
const Authentication: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div style={{justifyContent: 'center', alignItems: 'center'}}>
      <Auth/>
    </div>
  );
};

export default Authentication;
