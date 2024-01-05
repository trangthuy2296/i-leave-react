import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const Settings = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
               <Layout>
                <Content style={{ margin: '16px' }}>
                    {/* Your dashboard content goes here */}
                    <h1>This is settings page</h1>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Settings;