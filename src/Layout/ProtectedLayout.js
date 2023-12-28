import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  FormOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useNavigate, Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import Logo from '../Images/logo-ileave.svg';
import AppHeader from '../components/AppHeader';

const { Sider, Content } = Layout;

export const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  console.log('accessToken:', accessToken);
  console.log('accessToken.email:', accessToken.email);
  const navigate = useNavigate();
  const outlet = useOutlet();
  const [currentPage, setCurrentPage] = useState('Requests');


  if (!accessToken) {
    return <Navigate to="/Login" />;
  }

  const handleMenuClick = ({ key }) => {
    setCurrentPage(key);
    // Add additional logic if needed for each menu item
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={240}
        style={{
          height: '100vh',
          backgroundColor: '#ffffff', // Set the background color
          padding: '16px', // Adjust padding as needed

        }}
      >
        {/* Add your top logo */}
        <div style={{ marginBottom: '20px' }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: '100%', maxWidth: '180px' }}
          />
        </div>

        {/* Add your menu items */}
        <Menu
          theme="light"
          mode="vertical"
          defaultSelectedKeys={['Requests']}
          onClick={handleMenuClick}
        >
          <Menu.Item key="Requests" icon={<FormOutlined />}>
            Requests
          </Menu.Item>
          <Menu.Item key="Calendar" icon={<CalendarOutlined />}>
            Calendar
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
      <AppHeader userEmail={accessToken.email} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Content style={{ margin: '24px 24px 24px 24px', background: "#ffffff", borderRadius: 8, }}>
          <div
            style={{
              padding: 24,
            }}
          >
            {outlet}
          </div>
        </Content>
      </Layout>
    </Layout>
  );

};
