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

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();
  
    if (!user) {
      return <Navigate to="/Login" />;
    }
  
  };