import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Correct import
import React from "react";
import "./Login.css"; // Correct CSS import

const Login = ({ setUser }) => {
  const onSuccess = (response) => {
    const decoded = jwtDecode(response.credential); // Correct function call
    console.log("Login Success:", decoded);
    setUser(decoded); // Store user details
  };

  const onFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">EZTech</h2>
          <p className="login-subtitle">Login to access your dashboard</p>

          <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
            useOneTap
            theme="filled_blue"
          />

          <p className="footer-text">Powered by Google OAuth</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
