import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    FileOutlined,
} from '@ant-design/icons';

const { Sider, Content, Header } = Layout;

const Dashboard = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={80} theme="dark">
                <Menu mode="vertical" theme="dark" defaultSelectedKeys={['dashboard']}>
                    <Menu.Item key="dashboard" icon={<DashboardOutlined />} />
                    <Menu.Item key="users" icon={<UserOutlined />} />
                    <Menu.Item key="files" icon={<FileOutlined />} />
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0,  }} />
                <Content style={{ margin: '16px' }}>
                    {/* Your dashboard content goes here */}
                    <h1>Welcome to the Dashboard</h1>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
