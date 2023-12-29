import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { formatDistance, subDays } from "date-fns";
import '../../App.css';
import { Space, Table, Select, Button, Flex, Result } from 'antd';
import { FormOutlined, MoreOutlined } from '@ant-design/icons';
import RequestTable from './RequestTable';


const handleChange = (value, field) => {
    // Add logic for handling different Select components
    console.log(`Selected ${value} for ${field}`);
    // Implement specific logic for each Select component's value change
};
const RequestListing = () => {
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
                            { value: 'Today', label: 'Today' },
                            { value: 'This week', label: 'This week' },
                            { value: 'This month', label: 'This month' }
                        ]}
                    />
                    <label className="typo">Member</label>
                    <Select
                        defaultValue="All"
                        style={{ width: 120 }}
                        onChange={(value) => handleChange(value, 'Member')}
                        options={[
                            { value: 'All', label: 'All' },
                            { value: 'Barry', label: 'Barry' },
                            { value: 'Ann', label: 'Ann' },
                            { value: 'Leo', label: 'Leo' }
                        ]}
                    />
                </Space>
                <Flex gap="small" wrap="wrap">
                    <Button type="primary" className="primary-button">
                        Create Leave Request
                    </Button>
                </Flex>
                </div>
            
            <RequestTable />
        </div>
    );
                };


export default RequestListing;