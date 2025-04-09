import React, { useState } from 'react';
import SignIn from '../components/Authentication/SignIn';
import SignUp from '../components/Authentication/SignUp';
import '../App.css';
import logo from '../assets/image.png';

const Authentication: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="authentication-container">
      <h1 className="authentication-header" style={{ justifyContent: "center", alignItems: "center" }}>
        Welcome to{" "}
        <img
          src={logo}
          alt="Lumora"
          className="authentication-logo"
        />{" "}
      </h1>
      <div
        className="white-box"
        style={{
          width: "35vw",
          paddingTop: "5%",
          paddingBottom: "8%",
          maxWidth: "1280px",
        }}
      >
        <div className="toggle">
          <button
            onClick={() => setIsSignIn(true)}
            disabled={isSignIn}
            className="toggle-button"
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            disabled={!isSignIn}
            className="toggle-button"
          >
            Sign Up
          </button>
        </div>
        {isSignIn ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default Authentication;
