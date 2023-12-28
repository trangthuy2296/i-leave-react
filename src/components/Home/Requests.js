import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    FileOutlined,
} from '@ant-design/icons';

const { Sider, Content, Header } = Layout;

const Requests = () => {
    return (
        <Layout >
                <Content  style={{ background:"#ffffff" }}>
                    {/* Your dashboard content goes here */}
                    <h1>Welcome to the Dashboard</h1>
                </Content>
    
        </Layout>
    );
};

export default Requests;