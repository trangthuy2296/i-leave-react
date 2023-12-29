import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Popconfirm } from 'antd';
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
          const response = await axios.get('http://localhost:7003/api/requests', {
            params: {
              fromDate: '2000-01-01',
              toDate: '2024-12-31',
              userId: 'all',
              limit: 1000,
              offset: 0,
            },
          });
      
          if (response.data && Array.isArray(response.data.requests)) {
            const dataWithIndex = response.data.requests.map((item, index) => ({
              ...item,
              key: (index +1).toString(),
            }));
            setDataSource(dataWithIndex);
          } else {
            console.error('API response data.requests property is not an array:', response.data);
          }
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
        },
        {
            title: 'Requester',
            key: 'createdBy.name',
            render: (text, record) => record.createdBy.name,
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
                    <Popconfirm
                    title="Are you sure you want to delete this request?"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Yes"
                    cancelText="No"
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

  /*  const deleteRequest = async (key) => {
        try {
          // Make an HTTP DELETE request to your API endpoint
          const response = await axios.delete(`http://localhost:7003/api/requests/${key}`);
    
          // Handle success or show a notification to the user
          console.log('Request deleted successfully:', response.data);
    
          // After deleting, you may want to refresh the data by fetching it again
          fetchData();
        } catch (error) {
          console.error('Error deleting request:', error);
          // Handle error or show a notification to the user
        }
      };*/

    return <Table dataSource={dataSource} columns={columns} />;
};

export default RequestTableList;