import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import LogoutIcon from '../../Icon/Logout.svg';
import { DownOutlined } from '@ant-design/icons';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../../Hook/useAuth';



const ProfileDropdown = ({ userName, onLogout }) => {


  const menuItems = (
    <Menu>
      <Menu.Item key="logout" onClick={onLogout} icon={<img alt="iconLogout" src={LogoutIcon} />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menuItems}a>
      <Button type="text" style={{ padding: '0' }}>
        <span style={{ fontSize: '16', fontWeight: 'bold' }}>{userName}</span>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default ProfileDropdown;
