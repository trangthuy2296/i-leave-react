import React, { useState } from 'react';
import { Layout, Menu, Button, theme, PageHeader, Flex } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { useNavigate, Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../Hook/useAuth';


const { Header, Sider, Content } = Layout;


export const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  console.log('accessToken:', accessToken);
  const navigate = useNavigate();
  const outlet = useOutlet();
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('Dashboard'); 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleMenuClick = (item) => {
    setCurrentPage(item.label);};

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout style={{ height: Flex }}>
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
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {outlet}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
