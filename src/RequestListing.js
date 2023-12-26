import React from 'react';
import { useState, useEffect } from "react";
import './App.css';
import { Space, Table, Select, Button, Flex, Result } from 'antd';
import { FormOutlined, MoreOutlined } from '@ant-design/icons';




const handleChange = (value) => {
    console.log(`selected ${value}`);
};
/* const [columns,setColumns] = useState( [
    {
        title: '#',
        dataIndex: 'id',
    
    },
    {
        title: 'Requester',
        dataIndex: 'requester',
        //render: (text) => <a>{text}</a>,
    },
    {
        title: 'Leave Duration',
        dataIndex: 'duration',
    },
    {
        title: 'Leave Dates',
        dataIndex: 'dates',
    },
    {
        title: 'Note',
        dataIndex: 'note',
    },
    {
        title: 'Sent on Slack at',
        dataIndex: 'sentslacktime',
    }, 

    {
        title: 'Actions',
        key: 'action',
        render: (_, record) => (
            <Space>
                <FormOutlined />
                <MoreOutlined />

            </Space>
        ),
    },*/
/* const [dataSource, setDataSource] = useState ([]);

useEffect(() => {
    fetch("https://dummyjson.com/quotes")
    .then((res) => res.json())
    .then((result) => {
        setDataSource(result.quotes);
    });
}, []);
    {
        no: '1',
        requester: 'Sylvia Nguyen',
        duration: '2 days',
        dates: '21 Dec 2023, 22 Dec 2023',
        note: 'sick leave',
        sentslacktime: '14 Dec · 7:00 PM',
    },
    {
        no: '2',
        requester: 'Ann Nguyen',
        duration: '2 days',
        dates: '21 Dec 2023, 22 Dec 2023',
        note: 'sick leave',
        sentslacktime: '14 Dec · 7:00 PM',
    },
    {
        no: '3',
        requester: 'Leo Nguyen',
        duration: '2 days',
        dates: '21 Dec 2023, 22 Dec 2023',
        note: 'sick leave',
        sentslacktime: '14 Dec · 7:00 PM',
    },
    {
        no: '4',
        requester: 'Kevin Nguyen',
        duration: '2 days',
        dates: '21 Dec 2023, 22 Dec 2023',
        note: 'sick leave',
        sentslacktime: '14 Dec · 7:00 PM',
    },
    {
        no: '5',
        requester: 'Sylvia Nguyen',
        duration: '2 days',
        dates: '21 Dec 2023, 22 Dec 2023',
        note: 'sick leave',
        sentslacktime: '14 Dec · 7:00 PM',
    },*/
;

const RequestListing = () => {
    const [columns, setColumns] = useState([
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Quote',
            dataIndex: 'quote',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        }
    ]);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/quotes")
            .then((res) => res.json())
            .then((result) => {
                setDataSource(result.quotes);
            });
    }, []);

    return (
        <div className="request-listing-container">
            <div className="request-listing-header">
                <Space wrap>
                    <label className="typo">Date</label>
                    <Select
                        defaultValue="Today"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'Today',
                                label: 'Today',
                            },
                            {
                                value: 'This week',
                                label: 'This week',
                            },
                            {
                                value: 'This month',
                                label: 'This month',
                            },
                            {
                                value: 'This year',
                                label: 'This year',
                                disabled: true,
                            },
                        ]}
                    />
                    <label className="typo">Member</label>
                    <Select
                        defaultValue="All"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'All',
                                label: 'All',
                            },
                            {
                                value: 'Sylvia',
                                label: 'Sylvia',
                            },
                            {
                                value: 'Ann',
                                label: 'Ann',
                            },
                            {
                                value: 'Cara',
                                label: 'Cara',
                            },
                            {
                                value: 'Nellie',
                                label: 'Nellie',
                            },
                            {
                                value: 'Kevin',
                                label: 'Kevin',
                            },
                            {
                                value: 'Barry',
                                label: 'Barry',
                            },
                            {
                                value: 'Leo',
                                label: 'Leo',
                            },

                        ]}
                    />
                </Space>
                <Flex gap="small" wrap="wrap">
                    <Button type="primary" className="primary-button">Create Leave Request</Button>
                </Flex>
                </div>
            <div className="request-listing-table" >
                <Table
                        columns={columns}
                        dataSource={dataSource}
                        bordered
                        scroll={{ y: 900 }}
                        >
  
                        </Table>
                    </div>
        
                </div>
        
        
            );
        }
                export default RequestListing;