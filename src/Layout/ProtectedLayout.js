import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Dropdown } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
} from '@ant-design/icons';
import LogoutIcon from '../Icon/Logout.svg'
import LogoApp from '../Icon/Logo.svg'
import { useNavigate, Navigate, useOutlet, Link } from 'react-router-dom';
import { useAuth } from '../Hook/useAuth';
import '../App.css';
import { jwtDecode } from "jwt-decode";

const { Header, Sider, Content } = Layout

export const ProtectedLayout = () => {
  const { accessToken, logout } = useAuth();
  console.log('accessToken:', accessToken);
  const navigate = useNavigate();
  const outlet = useOutlet();
  const [currentPage, setCurrentPage] = useState('Request Listing');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const decodedToken = jwtDecode(accessToken);
  console.log('code token', decodedToken);
  const userName = decodedToken.user.name;
  console.log('userName', userName);


  /*/Dropdown button /*/
  const menuItems = (
    <Menu>
      <Menu.Item key="logout" onClick={logout} icon={<img alt="iconLogout" src={LogoutIcon} />}>
        Logout
      </Menu.Item>
    </Menu>
  );
  
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout className="full-screen-layout" style={{ minHeight: '100vh', background: colorBgContainer, }}>
      <Sider width={240} style={{ background: colorBgContainer, }} >
        <div style={{ padding: '24px 16px 32px 16px' }}
        ><img alt="Logo" src={LogoApp} /></div>
        <Menu
          style={{ height: '100%', padding: '0px 16px 40px 16px' }}
          selectedKeys={[currentPage]}
          defaultSelectedKeys={['Request Listing']}
          onClick={(e) => {
            setCurrentPage(e.key);
            navigate(`/${e.key.toLowerCase()}`);
          }}
          items={[
            {
              key: 'Request Listing',
              icon: <UserOutlined />,
              content: <Link to="/">Request Listing</Link>,
              label: 'Request Listing'
            },
            {
              key: 'Settings',
              icon: <VideoCameraOutlined />,
              content: <Link to="/settings">Settings</Link>,
              label: 'Settings',
            },
          ]}
        />

      </Sider>

      <Layout>
        <Header style={{ width: '100%', display: 'flex', padding: 24, background: '#f5f5f5', alignItems: 'center', justifyContent: 'space-between', }}>

          <h2>{currentPage}</h2>
          <Dropdown overlay={menuItems}>
            <Button onClick={(e) => e.preventDefault()} type="text" style={{padding: '0'}}>
             <span style={{ fontSize: '16', fontWeight: 'bold' }}> {userName}</span><DownOutlined />
            </Button>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 24px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {outlet}
        </Content>
      </Layout>
    </Layout >
  );
};
