import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Popconfirm, Select } from 'antd';
import {
    FormOutlined, DeleteOutlined
} from '@ant-design/icons';
import { differenceInDays, format, getYear, isSameDay, isWeekend } from 'date-fns';
import axios from 'axios';
import api from '../ApiDefine';

const { Option } = Select;
const { confirm } = Modal;

const RequestTableList = ({ fromDate, toDate, userID }) => {

const columns = [
    {
        title: '#',
        dataIndex: 'key',
        sort: (a, b) => a.key.localeCompare(b.key),
    },
    {
        title: 'Requester',
        key: 'createdBy.name',
        render: (text, record) => record.createdBy.name,
        sorter: (a, b) => a.createdBy.name.localeCompare(b.createdBy.name),
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
        sorter: (a, b) => {
            // Leave duration comparison logic
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
        sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
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
                <Popconfirm
                    title="Are you sure you want to delete this request?"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Delete"
                    cancelText="Cancel"
                >
                    <Button
                        type='danger'
                        icon={<DeleteOutlined />}
                        style={{ color: 'red' }}
                    >
                    </Button>
                </Popconfirm>
            </Space>
        ),
    },
];

const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/requests', {
                    params: {
                        fromDate: fromDate.toISOString(), // Ensure proper formatting
                        toDate: toDate.toISOString(), // Ensure proper formatting
                        userId: userID,
                        limit: 1000,
                        offset: 0,
                    },
                });
    
                if (response.data && Array.isArray(response.data.requests)) {
                    const dataWithIndex = response.data.requests.map((item, index) => ({
                        ...item,
                        key: (index + 1).toString(),
                    }));
                    setDataSource(dataWithIndex);
                } else {
                    console.error('API response data.requests property is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData(); // Call the fetch function
    
    }, [fromDate, toDate, userID]); // Watch for changes in these dependencies





const handleEdit = (key) => {
    // Add edit logic here
    console.log(`Edit request with key: ${key}`);
};

const handleDelete = async (_id) => {
    try {
        const response = await axios.delete(`http://localhost:7003/api/requests/${_id}`);

        if (response.status === 200) {
            // Request successfully deleted, you may want to update the local state or refetch data
            console.log(`Request with key ${_id} deleted successfully`);
            window.location.reload();
        } else {
            console.error(`Failed to delete request with key ${_id}`);
        }
    } catch (error) {
        console.error('Error deleting request:', error);
    }
};

return <Table dataSource={dataSource} columns={columns} />;
};

export default RequestTableList;