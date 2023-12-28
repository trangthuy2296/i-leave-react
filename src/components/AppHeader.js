import React from 'react';
import { Layout, Button, Dropdown, Menu, Flex } from 'antd';
import { LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const { Header } = Layout;

const AppHeader = ({ userEmail, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const { logout,  } = useAuth(); 
  console.log('userEmail:', userEmail);
  

  const handleLogout = () => {
    logout();
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
      <div style={{ color: '#000000',fontSize:24, fontWeight: 600 }}>{currentPage}</div>
      <div>
        {userEmail && (
          <span style={{ marginRight: '16px', color: 'rgba(255, 255, 255, 0.85)' }}>
            {userEmail}
          </span>
        )}
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Button onClick={(e) => e.preventDefault()} type="text" style={{fontSize:16, fontWeight:600}}>
            {userEmail} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;