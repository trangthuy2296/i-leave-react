import React, { useState } from 'react';
import { Layout, theme, } from 'antd';
import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../../Hook/useAuth';
import '../../App.css';
import ProfileDropdown from './UserName';
import Sidebar from './Sidebar'; 
import useUserName from '../../Hook/getUserInfo';

const { Header, Content } = Layout

export const ProtectedLayout = () => {
  const { accessToken, logout } = useAuth();
  console.log('accessToken on protected layout', accessToken);
  const outlet = useOutlet();
  const [currentPage, setCurrentPage] = useState('Request Listing');
  const userName = useUserName(accessToken);


  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout className="full-screen-layout" style={{ minHeight: '100vh' }}>

     <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} style={{ background: 'ffffff' }} />

      <Layout>

        <Header style={{ width: '100%', display: 'flex', padding: 24, background: '#f5f5f5', alignItems: 'center', justifyContent: 'space-between', }}>
          <h2>{currentPage}</h2>
          <ProfileDropdown userName={userName} onLogout={logout} />
        </Header>

        <Content className='content-container'>
          {outlet}
        </Content>
      </Layout>
    </Layout >
  );
};
