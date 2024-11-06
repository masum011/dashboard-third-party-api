const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 4000;

// Step 1: Redirect to Upstox Login Page for Authorization
app.get('/api/auth/upstox/login', (req, res) => {
  const authUrl = `https://api.upstox.com/v2/login/authorization/dialog?client_id=${process.env.UPSTOX_API_KEY}&redirect_uri=${process.env.UPSTOX_REDIRECT_URI}&response_type=code`;
  
  res.redirect(authUrl);
});

// Step 2: Handle Upstox Callback and Exchange Authorization Code for Access Token
app.get('/api/auth/upstox/callback', async (req, res) => {
  const authorizationCode = req.query.code;

  if (!authorizationCode) {
    return res.status(400).json({ error: 'Authorization code missing' });
  }

  try {
    // Request to exchange authorization code for access token
    const tokenResponse = await axios.post(
      'https://api.upstox.com/login/authorization/token',  // This should be the correct token endpoint from Upstox documentation
      new URLSearchParams({
        code: authorizationCode,
        client_id: process.env.UPSTOX_API_KEY,
        client_secret: process.env.UPSTOX_SECRET_KEY,
        redirect_uri: process.env.UPSTOX_REDIRECT_URI,
        grant_type: 'authorization_code',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }
    );

    // Destructuring the relevant data from the response
    const { access_token, refresh_token, user_profile } = tokenResponse.data;

    // Send the token and profile info back to the client
    res.json({
      message: 'Access token successfully acquired',
      access_token,
      refresh_token,
      user_profile,
    });
  } catch (error) {
    // Improved error handling to capture different types of errors
    console.error('Error exchanging authorization code for access token:', error.response?.data || error.message);

    // Sending error response based on what went wrong
    res.status(500).json({
      message: 'Failed to get access token',
      error: error.response?.data || 'Server error',
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Upstox backend running on http://localhost:${port}`);
});
