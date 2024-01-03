import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import LogoApp from '../../Icon/Logo.svg';
import { useNavigate, Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const { token: { colorBgContainer}, } = theme.useToken();

  return (
    <Sider width={240} style={{ background: colorBgContainer }}>
      <div style={{ padding: '24px 16px 32px 16px' }}>
        <img alt="Logo" src={LogoApp} />
      </div>
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
            label: 'Request Listing',
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
  );
};

export default Sidebar;
