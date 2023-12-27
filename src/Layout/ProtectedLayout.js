import React, { useState } from 'react';
import { Layout, Menu, Button, theme, PageHeader, Flex, Avatar, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined, 
} from '@ant-design/icons';
import { useNavigate, Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../Hook/useAuth';

const { Header, Sider, Content } = Layout;


export const ProtectedLayout = () => {
  const { accessToken, logout } = useAuth();
  console.log('accessToken:', accessToken);
  const navigate = useNavigate();
  const outlet = useOutlet();
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  /*/Dropdown button /*/
  const menu = (
    <Menu>
      <Menu.Item onClick={logout} key="logout" icon={<UserOutlined />}>
        Logout
      </Menu.Item>
    </Menu>);
  /*/Dropdown button /*/

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout className="full-screen-layout" style={{ height: Flex }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Settings',
            },
          ]}
        />

        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
      </Sider>

      <Layout>
        <Header style={{ display: 'flex', padding: 24, background: colorBgContainer, alignItems: 'center', justifyContent: 'space-between', }}>

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
