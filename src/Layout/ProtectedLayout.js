import React, { useState } from 'react';
import { Layout, Menu, Button, theme, PageHeader, Flex, Avatar, Dropdown } from 'antd';
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

const { Header, Sider, Content } = Layout;

export const ProtectedLayout = () => {
  const { accessToken, logout } = useAuth();
  console.log('accessToken:', accessToken);
  const navigate = useNavigate();
  const outlet = useOutlet();
  const [currentPage, setCurrentPage] = useState('RequestListing');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  /*/Dropdown button /*/
  const menu = (
    <Menu>
      <Menu.Item onClick={logout} key="logout" icon={<img src={LogoutIcon} />}>
        Logout
      </Menu.Item>
    </Menu>);
  /*/Dropdown button /*/

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout className="full-screen-layout" style={{ minHeight: '100vh', background: colorBgContainer, }}>
      <Sider width={240}style={{ background: colorBgContainer, }} >
      <div style={{padding: '24px 16px 32px 16px' }}
      ><img src={LogoApp} /></div>
        <Menu
          style={{ height: '100%', padding: '0px 16px 40px 16px' }}
          selectedKeys={[currentPage]}
          defaultSelectedKeys={['RequestListing']}
          onClick={(e) => {
            setCurrentPage(e.key);
            navigate(`/${e.key.toLowerCase()}`); // Update the route dynamically
          }}
        >
          <Menu.Item key="RequestListing" icon={<UserOutlined />}>
            <Link to="/">Request Listing</Link>
          </Menu.Item>
          <Menu.Item key="Settings" icon={<VideoCameraOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>

        </Menu>
      </Sider>

      <Layout>
        <Header style={{ width: '100%', display: 'flex', padding: 24, background: '#f5f5f5', alignItems: 'center', justifyContent: 'space-between', }}>

          <h2>{currentPage}</h2>
          <Dropdown overlay={menu}>
            <Button onClick={(e) => e.preventDefault()} type="text">
              UserVIP <DownOutlined />
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
