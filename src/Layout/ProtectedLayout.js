import React, { useState } from 'react';
import { Layout, Menu, Button, theme, PageHeader, Flex, Avatar, Dropdown } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined, 
} from '@ant-design/icons';
import LogoutIcon from '../Icon/Logout.svg'
import { useNavigate, Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../Hook/useAuth';
import '../App.css';

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
      <Menu.Item onClick={logout} key="logout" icon={<img src={LogoutIcon}/>}>
        Logout
      </Menu.Item>
    </Menu>);
  /*/Dropdown button /*/

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout className="full-screen-layout" style={{ minHeight: '100vh' }}>
      <Sider width={240} >
        <Menu
          style={{height:'100%', padding: '40px 16px 40px 16px'}}
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

      <Layout>
        <Header style={{ width: '100%', display: 'flex', padding: 24, background: '#f5f5f5', alignItems: 'center', justifyContent: 'space-between', }}>

          <h2>{currentPage}</h2>
          <Dropdown overlay={menu} trigger={['click']}>
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
