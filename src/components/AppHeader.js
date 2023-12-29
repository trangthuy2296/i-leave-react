import React, { useEffect } from 'react';
import { Layout, Button, Dropdown, Menu } from 'antd';
import { LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';

const { Header } = Layout;



const AppHeader = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();
  const [userEmail, setUserEmail] = useLocalStorage('email', '');
  console.log('Current userEmail:', userEmail);

  useEffect(() => {
    // Retrieve user email from local storage
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
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
          <Button onClick={(e) => e.preventDefault()} type="text" style={{ fontSize: 16, fontWeight: 600 }}>
            {userEmail} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;