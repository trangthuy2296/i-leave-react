import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Popconfirm, Select } from 'antd';
import {
    FormOutlined, DeleteOutlined
} from '@ant-design/icons';
import { differenceInDays, format, getYear, isWeekend, isSameDay } from 'date-fns';
import axios from 'axios';

const { Option } = Select;
const { confirm } = Modal;

const RequestTableList = ({ dateFilter, selectedMember }) => {
    const [dataSource, setDataSource] = useState([]);

    const fetchData = async () => {
        try {
            let fromDate, toDate;


            const today = new Date();
            const currentDay = today.getDay();
            const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust for Sunday

            switch (dateFilter) {
                case 'NextMonth':
                    fromDate = format(new Date(today.getFullYear(), today.getMonth() + 1, 1), 'yyyy-MM-dd');
                    toDate = format(new Date(today.getFullYear(), today.getMonth() + 2, 0), 'yyyy-MM-dd');
                    break;
                case 'NextWeek':
                    const nextMonday = new Date(today.setDate(diff + 7)); // Add 7 days for next week
                    fromDate = format(nextMonday, 'yyyy-MM-dd');
                    toDate = format(new Date(nextMonday.setDate(nextMonday.getDate() + 6)), 'yyyy-MM-dd');
                    break;
                case 'ThisMonth':
                    fromDate = format(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd');
                    toDate = format(new Date(today.getFullYear(), today.getMonth() + 1, 0), 'yyyy-MM-dd');
                    break;
                case 'ThisWeek':
                    const monday = new Date(today.setDate(diff));
                    fromDate = format(monday, 'yyyy-MM-dd');
                    toDate = format(new Date(today.setDate(today.getDate() + 6)), 'yyyy-MM-dd');
                    break;
                case 'LastWeek':
                    const lastWeekMonday = new Date(today.setDate(diff - 7)); // Subtract 7 days for last week
                    fromDate = format(lastWeekMonday, 'yyyy-MM-dd');
                    toDate = format(new Date(lastWeekMonday.setDate(lastWeekMonday.getDate() + 6)), 'yyyy-MM-dd');
                    break;
                case 'LastMonth':
                    fromDate = format(new Date(today.getFullYear(), today.getMonth() - 1, 1), 'yyyy-MM-dd');
                    toDate = format(new Date(today.getFullYear(), today.getMonth(), 0), 'yyyy-MM-dd');
                    break;
                case 'All':
                    // Default case: set fromDate and toDate to retrieve all data
                    fromDate = '2000-01-01';
                    toDate = '2024-12-31';
                    break;
                default:
                    // Handle any other cases or throw an error for an unsupported filter
                    throw new Error(`Unsupported date filter: ${dateFilter}`);
            }

            console.log('dateFilter:', dateFilter);
            console.log('fromDate:', fromDate);
            console.log('toDate:', toDate);

            const response = await axios.get('http://localhost:7003/api/requests', {
                params: {
                    fromDate,
                    toDate,
                    userId: selectedMember ? selectedMember._id : 'all',
                    limit: 1000,
                    offset: 0,
                },
            });

            console.log('selectedMember', selectedMember );
            console.log('API Response:', response);

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
            setDataSource([]);
        }
    };


    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, [dateFilter, selectedMember]);


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
                    : `${startDateFormatted} - ${endDateFormatted} ${getYear(record.startDate)}` ;
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