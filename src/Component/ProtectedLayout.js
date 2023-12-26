import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../Hook/useAuth';

const { Header, Sider, Content } = Layout;

export const ProtectedLayout = ({ children }) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  if (accessToken) {
    // Redirect to another page (e.g., /dashboard) if the user has a valid access token
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={80} theme="dark" collapsible>
        {/* Sidebar content */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />} />
          <Menu.Item key="2" icon={<VideoCameraOutlined />} />
          <Menu.Item key="3" icon={<UploadOutlined />} />
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {/* Render the content specific to the current route */}
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
