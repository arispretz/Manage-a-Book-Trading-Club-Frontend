import React from 'react';

const Login = () => {
  const handleLogin = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.REACT_APP_REDIRECT_URI);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

  return (
    <div>
      <h2>Login with GitHub</h2>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

export default Login;
