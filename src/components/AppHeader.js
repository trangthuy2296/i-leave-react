import React, { useEffect, useState } from 'react';
import { Layout, Button, Dropdown, Menu } from 'antd';
import { LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import axios from 'axios';

const { Header } = Layout;

const AppHeader = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
  console.log('useEffect triggered');
  console.log('Current accessToken:', accessToken);
  const fetchUserEmail = async () => {
    try {
      if (accessToken && accessToken._id) {
        console.log('Fetching user email for user ID:', accessToken._id);
        const response = await axios.get(`http://localhost:7003/api/users/${accessToken._id}`);
        console.log('API response:', response.data);
        // Assuming the response.data is an object with an email property
        setUserEmail(response.data.email);
      }
    } catch (error) {
      console.error('Error fetching user email:', error);
    }
  };

  fetchUserEmail();
}, [accessToken]);

  const handleLogout = () => {
    logout();
    // Remove user email from local storage on logout
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      handleLogout();
    } else {
      setCurrentPage(key);
    }
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', paddingTop: 24 }}>
      <div style={{ color: '#000000', fontSize: 24, fontWeight: 600 }}>{currentPage}</div>
      <div>
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Button onClick={(e) => e.preventDefault()} type="text" style={{ fontSize: 16, fontWeight: 600 }} >
           {userEmail} No God <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;