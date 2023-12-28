import React from 'react';
import { Layout, Select, Button, Table, Space, Modal } from 'antd';
import {
    PlusCircleOutlined,
} from '@ant-design/icons';
import RequestTableList from './RequestTableList';

const { Content } = Layout;


const Requests = () => {
    return (
        <Layout >
            <Content style={{ background: "#ffffff" }}>
                {/* Your dashboard content goes here */}
                <div className='justify-between' style={{paddingBottom:16}}>
                    <div style={{ gap: 16, display: 'inline-flex', alignItems: 'center' }}>
                        Date
                        <Select
                            defaultValue="Today"
                            style={{ width: 200, height: 40 }}
                            allowClear
                            options={[{ value: 'Today', label: 'Today' }]}
                        />
                        Member
                        <Select
                            defaultValue="1"
                            style={{ width: 200, height: 40 }}
                            allowClear
                            options={[
                                { value: '1', label: 'All' },
                                { value: '2', label: 'Leo' },
                            ]}
                        />
                    </div>
                    <Button type="primary" icon={<PlusCircleOutlined />}>Create New Request</Button>
                </div>

                <RequestTableList/>
            </Content>


        </Layout>
    );
};

export default Requests;