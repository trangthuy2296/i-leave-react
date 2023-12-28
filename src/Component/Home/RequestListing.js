import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios"
import '../../App.css';
import { Space, Table, Select, Button, Flex, Result } from 'antd';
import { FormOutlined, MoreOutlined } from '@ant-design/icons';




const handleChange = (value, field) => {
    // Add logic for handling different Select components
    console.log(`Selected ${value} for ${field}`);
    // Implement specific logic for each Select component's value change
};
const RequestListing = () => {
    const [dataSource, setDataSource] = useState([]);
    const columns = [
        {
            key: '1',
            title: '#',
            dataIndex: 'index',
        
        },
        {
            key: '2',
            title: 'Requester',
            dataIndex: '_id',
        },
        {
           key: '3',
            title: 'Leave Dates',
            dataIndex: 'startDate',
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
            render: (_, record) => (
                <Space>
                    <FormOutlined />
                    <MoreOutlined />
    
                </Space>
            ),
        }];
    
    const dataType = "requests";

    useEffect(() => {
        
        const result = axios.get(`http://localhost:7003/api/${dataType}`)
            .then(res => setDataSource(res.data))
            .catch(err => console.log(err));
    },[]);
    return (
        <div className="request-listing-container">
            <div className="request-listing-header">
                <Space wrap>
                    <label className="typo">Date</label>
                    <Select
                        defaultValue="Today"
                        style={{ width: 120 }}
                        onChange={(value) => handleChange(value, 'Date')}
                        options={[
                            // Options for Date Select
                        ]}
                    />
                    <label className="typo">Member</label>
                    <Select
                        defaultValue="All"
                        style={{ width: 120 }}
                        onChange={(value) => handleChange(value, 'Member')}
                        options={[
                            // Options for Member Select
                        ]}
                    />
                </Space>
                <Flex gap="small" wrap="wrap">
                    <Button type="primary" className="primary-button">
                        Create Leave Request
                    </Button>
                </Flex>
            </div>
            <div className="request-listing-table">
                <Table 
                columns={columns} 
                dataSource={dataSource.map((requests, dataIndex) => (
                    <tr key={dataIndex}>
                        <td>{requests.index}</td>
                        <td>{requests._id}</td>
                        <td>{requests.startDate}</td>
                        <td>{requests.note}</td>
                    </tr>
                ))} 
                bordered 
                scroll={{ y: 900 }} />
            </div>
        </div>
    );
                };


export default RequestListing;