import React from 'react';
import { useState, useEffect } from "react";
import api from '../Api/ApiDefine';
import { differenceInDays, format, getYear, isSameDay, isWeekend } from 'date-fns';
import '../../App.css';
import { Space, Table, Button, Popconfirm, message } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import EditLeaveReq from './EditLeaveReq';


const RequestTable = ({ fromDate, toDate, userID, tableUpdate, triggerRefresh }) => {

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
            render: (text, record) => record.createdBy ? record.createdBy.name : "Unknown",
        },
        {
            title: 'Leave Duration',
            key: 'leaveDuration',
            render: (_, record) => {
                const startDate = new Date(record.startDate);
                const endDate = new Date(record.endDate);
                const isSameDay = startDate.toDateString() === endDate.toDateString();

                if (isSameDay && record.timeSlot == 'Morning') {
                    return 'Morning';
                } else if (isSameDay && record.timeSlot == 'Afternoon') {
                    return 'Afternoon';
                }
                else if (isSameDay) {
                    return '1 day';
                }

                let days = differenceInDays(endDate, startDate) + 1;

                // Exclude weekends
                for (let i = 0; i < days; i++) {
                    const currentDate = new Date(startDate);
                    console.log(currentDate);
                    currentDate.setDate(startDate.getDate() + i);
                    console.log(currentDate);
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
                const sameDateFormatted = format(record.startDate, 'dd MMM yyyy')

                return startDateFormatted === endDateFormatted
                    ? sameDateFormatted
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
                        onClick={() => handleEdit(record._id)}
                    >
                    </Button>
                    <Popconfirm
                        title="Delete request"
                        description="Are you sure to delete this request?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Delete"
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

    //data of table
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
        console.log('Request Table is mounted/updated')
    
    }, [fromDate, toDate, userID, tableUpdate]); // Watch for changes in these dependencies
    

 
    //handle edit record
    const [isItemOpen, setItemOpen] = useState(false);

    const handleModalClose = () => {
        setItemOpen(false);
    }
    const [requestData, setRequestData] = useState();

    const handleEdit = async (_id) => {
        // Add edit logic here
        console.log(`Edit request with key: ${_id}`);
        try {
            const response = await api.get(`/requests/${_id}`);
            console.log("response data", response.data.result);
            setRequestData(response.data.result);
            console.log('request data', requestData);
            setItemOpen(true);
            
        } catch(err) {
            console.log ("err", err);
            message.error("Request not found");
        }
    };

    //handle delete record
    const handleDelete = async (_id) => {
        try {
            const response = await api.delete(`/requests/${_id}`);

            if (response.status === 200) {
                message.success(`Request deleted successfully`);
                console.log(`Request with key ${_id} deleted successfully`);
                setDataSource((prevDataSource) =>
                prevDataSource.filter((record) => record._id !== _id)
            );
            } else {
                message.error(`Failed to delete request`);
                console.error(`Failed to delete request with key ${_id}`);
            }
        } catch (error) {
            message.error(`Error deleting request`);
            console.error('Error deleting request:', error);
        }
    };

    return (<>
    <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: 900 }} />
        
    { isItemOpen && <EditLeaveReq
            handleModalClose={handleModalClose}
            isModalOpen={isItemOpen}
            requestData={requestData}
            triggerRefresh={triggerRefresh}/>}
    </>)

}

export default RequestTable;