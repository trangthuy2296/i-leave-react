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
import { differenceInDays, format, getYear, isWeekend, isSameDay } from 'date-fns';

const { confirm } = Modal;

const RequestTableList = () => {
    const [dataSource, setDataSource] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:7003/api/requests/list', {
                // Add your request parameters if needed
            });

            // Add an index to each item in the data array
            const dataWithIndex = response.data.map((item, index) => ({ ...item, key: (index + 1).toString() }));

            setDataSource(dataWithIndex);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Requester',
            dataIndex: 'createdBy.name', // Use dot notation to access nested property
            key: 'createdBy'
            
        },
        {
            title: 'Leave Duration',
            key: 'leaveDuration',
            render: (_, record) => {
                const startDate = new Date(record.startDate);
                const endDate = new Date(record.endDate);
    
                if (isSameDay(startDate, endDate)) {
                    return '1 day';
                }
    
                let days = differenceInDays(endDate, startDate) + 1;
    
                // Exclude weekends
                for (let i = 0; i <= days; i++) {
                    const currentDate = new Date(startDate);
                    currentDate.setDate(startDate.getDate() + i);
                    if (isWeekend(currentDate)) {
                        days -= 1;
                    }
                }
    
                return `${days} days`;
            },
        },
        {
            title: 'Leave Dates',
            dataIndex: 'leaveDates',
            key: 'leaveDates',
            render: (_, record) => {
                const startDateFormatted = format(record.startDate, 'dd MMM');
                const endDateFormatted = format(record.endDate, 'dd MMM');

                return startDateFormatted === endDateFormatted
                    ? startDateFormatted
                    : `${startDateFormatted} - ${endDateFormatted} ${getYear(record.startDate)}`;
            },
        },
        {
            title: 'Notes',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Sent on Slack at',
            dataIndex: 'statusOnSlack',
            key: 'statusOnSlack',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size='small'>
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