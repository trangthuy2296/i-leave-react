import React, { useState } from 'react';
import { Layout, Select, Button, Table, Space, Modal } from 'antd';
import {
    PlusCircleOutlined,
} from '@ant-design/icons';
import RequestTableList from './RequestTableList';

const { Content } = Layout;
const { Option } = Select;

const Requests = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateFilter, setDateFilter] = useState('ThisWeek');
    const [selectedMember, setSelectedMember] = useState('all');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDateFilterChange = (value) => {
        setDateFilter(value);
    };

    const handleMemberFilterChange = (value) => {
        setSelectedMember(value);
    };

    return (
        <Layout>
            <Content style={{ background: "#ffffff" }}>
                <div className='justify-between' style={{ paddingBottom: 16 }}>
                    <div style={{ gap: 16, display: 'inline-flex', alignItems: 'center' }}>
                        Date
                        <Select
                            value={dateFilter}
                            style={{ width: 200, height: 40 }}
                            onChange={handleDateFilterChange}
                        >
                            <Option value="NextMonth">Next Month</Option>
                            <Option value="ThisMonth">This Month</Option>
                            <Option value="NextWeek">Next Week</Option>
                            
                            <Option value="ThisWeek">This Week</Option>
                            <Option value="LastWeek">Last Week</Option>
                            <Option value="LastMonth">Last Month</Option>
                            <Option value="All">All</Option>
                        </Select>
                        Member
                        <Select
                            value={selectedMember}
                            style={{ width: 200, height: 40 }}
                            allowClear
                            options={[
                                { value: 'all', label: 'All' },
                                { value: 'leo', label: 'Leo' },
                                { value: 'kevin', label: 'Kevin' },
                            ]}
                            onChange={handleMemberFilterChange}
                        />
                    </div>
                    <Button type="primary" icon={<PlusCircleOutlined />} onClick={showModal}>
                        Create New Request
                    </Button>
                    <Modal title="Create New Request" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Some contents...</p>
                    </Modal>
                </div>

                <RequestTableList dateFilter={dateFilter} selectedMember={selectedMember} />
            </Content>
        </Layout>
    );
};

export default Requests;