import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    FileOutlined,
    PlusCircleOutlined,
    FormOutlined, DeleteOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

const RequestTableList = () => {
    const [dataSource, setDataSource] = useState([]);
  
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:7003/api/requests/list', {
          // Add your request parameters if needed
        });
  
        setDataSource(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); // Fetch data when the component mounts
  

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

    return <Table dataSource={dataSource} columns={columns} />;
};

export default RequestTableList;