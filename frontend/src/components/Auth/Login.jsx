import React, { useState } from "react";
import "./styles.css";
const Login = () => {
  const [clientId, setClientId] = useState("");
  const [redirectUri, setRedirectUri] = useState("");
  const [responseType, setResponseType] = useState("code");

  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <h2>Login</h2>
          <div>
            <label>Client ID:</label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Redirect URI:</label>
            <input
              type="url"
              value={redirectUri}
              onChange={(e) => setRedirectUri(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Response Type:</label>
            <select
              value={responseType}
              onChange={(e) => setResponseType(e.target.value)}
            >
              <option value="code">Code</option>
              <option value="token">Token</option>
            </select>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
