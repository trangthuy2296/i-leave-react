import React from 'react';
import { Table, Space, Button, Modal } from 'antd';
import {
    FormOutlined, DeleteOutlined
} from '@ant-design/icons';

const { confirm } = Modal;

const dataSource = [
    {
        key: '1',
        requester: 'John Doe',
        leaveDuration: '2 days',
        leaveDates: '2023-01-01 to 2023-01-02',
        notes: 'Hello @channel.Thực đơn Cơm trưa vừa được tạo bởi @hailey. Mời bạn bấm vào đây để đặt đồ ăn',
        sentOnSlack: '2023-01-01 10:00 AM',
    },
    // Add more data as needed
];

const columns = [
    {
        title: '#',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Requester',
        dataIndex: 'requester',
        key: 'requester',
    },
    {
        title: 'Leave Duration',
        dataIndex: 'leaveDuration',
        key: 'leaveDuration',
    },
    {
        title: 'Leave Dates',
        dataIndex: 'leaveDates',
        key: 'leaveDates',
    },
    {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
    },
    {
        title: 'Sent on Slack at',
        dataIndex: 'sentOnSlack',
        key: 'sentOnSlack',
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center', 
        render: (text, record) => (
            <Space size='middle'>
                <Button
                    type='link'
                    icon={<FormOutlined />}
                    onClick={() => handleEdit(record.key)}
                >
                </Button>
                <Button
                    type='danger'
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record.key)}
                    style={{ color: 'red' }}
                >
                </Button>
            </Space>
        ),
    },
];

const handleEdit = (key) => {
    // Add edit logic here
    console.log(`Edit request with key: ${key}`);
};

const handleDelete = (key) => {
    confirm({
        title: 'Are you sure you want to delete this request?',
        icon: <DeleteOutlined />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            // Add delete logic here
            console.log(`Delete request with key: ${key}`);
        },
    });
};

const RequestTableList = () => {
    return <Table dataSource={dataSource} columns={columns} />
}

export default RequestTableList;