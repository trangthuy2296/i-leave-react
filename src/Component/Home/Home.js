// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1>Home</h1>
    </div>
  );
};

export default Home;