import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Step 1: Start the OAuth flow by hitting the backend login route
  const handleLogin = () => {
    window.location.href = 'http://localhost:4000/api/auth/upstox/login';
  };

  // Step 2: Once the backend has redirected back with the tokens,
  // retrieve the user profile and access token from the backend
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/auth/upstox/callback');
      setAccessToken(response.data.access_token);
      setUserProfile(response.data.user_profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <div className="App">
      <h1>Upstox Integration</h1>

      {!accessToken ? (
        <>
          <button onClick={handleLogin}>Login with Upstox</button>
          <p>Click the button to log in with Upstox and retrieve your profile.</p>
        </>
      ) : (
        <>
          <h2>User Profile</h2>
          <pre>{JSON.stringify(userProfile, null, 2)}</pre>
          <p>Access Token: {accessToken}</p>
        </>
      )}

      <button onClick={fetchUserProfile}>Fetch User Profile</button>
    </div>
  );
};

export default Dashboard;
