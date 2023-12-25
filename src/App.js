import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import Login from './Login';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
    <LoginPage />
  </div>
  );
}



export default App;
