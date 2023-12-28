import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    FileOutlined,
} from '@ant-design/icons';

const { Sider, Content, Header } = Layout;

const Calendar = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
               <Layout>
                <Content style={{ margin: '16px' }}>
                    {/* Your dashboard content goes here */}
                    <h1>Welcome to the Dashboard</h1>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Calendar;