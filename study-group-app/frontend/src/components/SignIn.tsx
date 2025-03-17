import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      const response = await axios.post("http://localhost:3000/auth", {
        username,
        password,
      });
      // localStorage.setItem('token', response.data.accessToken);
      console.log(response);
      if (response) {
        navigate("/HomePage");
      }
    } catch (err) {
      console.log(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="input-label">Username</label> <br />
          <TextField
            id="username"
            value={username}
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            required
            margin="normal"
          />
        </div>
        <div>
          <label className="input-label">Password</label> <br />
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
        {error && <p className="error">{error}</p>}
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
