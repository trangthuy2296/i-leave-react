import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { differenceInDays, format, getYear } from 'date-fns';
import '../../App.css';
import { Space, Table, Select, Button, Flex, Modal } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';

const RequestTable = () => {

    //columns of table
    const columns = [
        {
            key: '1',
            title: '#',
            dataIndex: 'key',

        },
        {
            key: '2',
            title: 'Requester',
            dataIndex: '_id',
        },
        {
            title: 'Leave Duration',
            key: 'leaveDuration',
            render: (_, record) => {
                const duration = differenceInDays(record.endDate, record.startDate);
                return `${duration + 1} days`;
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
            key: '4',
            title: 'Note',
            dataIndex: 'note',
        },
        {
            key: '5',
            title: 'Sent on Slack at',
            dataIndex: 'statusOnSlack',
        },

        {
            key: '6',
            title: 'Actions',
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

    //data of table
    const [dataSource, setDataSource] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:7003/api/requests');

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

    const { confirm } = Modal;
    //handle edit record
    const handleEdit = (key) => {
        // Add edit logic here
        console.log(`Edit request with key: ${key}`);
    };

    //handle delete record
    const handleDelete = (key) => {
        confirm({
            title: 'Are you sure you want to delete this request?',
            icon: <DeleteOutlined />,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                // Add delete logic here
                console.log(`Delete request with key: ${key}`);
            },
        });
    };

    return (<Table
        columns={columns}
        dataSource={dataSource}

        scroll={{ y: 900 }} />)
}

export default RequestTable;