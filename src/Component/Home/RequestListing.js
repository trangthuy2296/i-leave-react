import React from 'react';
import { useState, useEffect, useContext } from "react";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addMonths } from "date-fns";
import '../../App.css';
import { Space, Select, Button, Flex, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import RequestTable from './RequestTable';
import CreateLeaveReq from './CreateLeaveReq';
import api from '../Api/ApiDefine';



const RequestListing = () => {

    //Date filter
    const [fromDate, setFromDate] = useState(new Date('2010-12-28'));
    const [toDate, setToDate] = useState(new Date('2200-12-31'));
    const handleDateChange = (value) => {
        if (value === 'all') {
            setFromDate(new Date('2000-12-28'));
            setToDate(new Date('2100-12-31'));
        } else if (value === 'today') {
            const todayStart = startOfDay(new Date());
            const todayEnd = endOfDay(new Date());
            setFromDate(todayStart);
            setToDate(todayEnd);
        } else if (value === 'thisWeek') {
            const startOfCurrentWeek = startOfWeek(new Date());
            const endOfCurrentWeek = endOfWeek(new Date());
            setFromDate(startOfCurrentWeek);
            setToDate(endOfCurrentWeek);
        } else if (value === 'thisMonth') {
            const startOfCurrentMonth = startOfMonth(new Date());
            const endOfCurrentMonth = endOfMonth(new Date());
            setFromDate(startOfCurrentMonth);
            setToDate(endOfCurrentMonth);
        } else if (value === 'nextMonth') {
            const today = new Date();
            const startOfNextMonth = startOfMonth(addMonths(today, 1));
            const endOfNextMonth = endOfMonth(addMonths(today, 1));
            setFromDate(startOfNextMonth);
            setToDate(endOfNextMonth);
        }
    };

    //Member filter
    const [userID, setUserID] = useState('all');
    const [userOptions, setUserOptions] = useState([]);

    const fetchUserListing = async () => {
        try {
            const response = await api.get('/users');
            const usernames = response.data.map((user) => ({
                value: user._id, // Replace with user ID or unique identifier
                label: user.name, // Replace with the property containing username
            }));

            setUserOptions(usernames);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    //a variable to request the table to update :D
    const [tableUpdate, setTableUpdate] = useState(0);

    useEffect(() => {
        console.log('the component is mounted')
        fetchUserListing();
    }, []);

    const handleMemberChange = (value) => {
        setUserID(value);
    };


    useEffect(() => {
        console.log('the component is mounted by 2nd useEffect')
        // Call the API with updated filter values (fromDate, toDate, userID)
        // Fetch data for the table using the updated filters
    }, [fromDate, toDate, userID]);


    // declare different value for the new request modal
    const [isModalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    }

    const handleModalClose = (updateRequire) => {
        setModalOpen(false)
    }

    const triggerRefresh = () => {
        setTableUpdate(tableUpdate => tableUpdate + 1);
        console.log('tableUpdate is set to ', tableUpdate)
    }

    return (
        <div className="request-listing-container">
            <div className="request-listing-header">
                <Space wrap>

                    Date
                    <Select
                        defaultValue="all"
                        style={{ width: 120 }}
                        onChange={handleDateChange}
                        options={[
                            { value: 'all', label: 'All' },
                            { value: 'today', label: 'Today' },
                            { value: 'thisWeek', label: 'This week' },
                            { value: 'thisMonth', label: 'This month' },
                            { value: 'nextMonth', label: 'Next month' }
                        ]}
                    />

                    Member
                    <Select
                        defaultValue="all"
                        style={{ width: 120 }}
                        onChange={handleMemberChange}
                        options={[
                            { value: 'all', label: 'All' },
                            ...userOptions,
                        ]}
                    />
                </Space>
                <Flex gap="small" wrap="wrap">
                    <Button size="large" type="primary" icon={<PlusCircleOutlined />} onClick={showModal} >
                        Create New Request
                    </Button>
                </Flex>
            </div>

            <RequestTable
                fromDate={fromDate}
                toDate={toDate}
                userID={userID}
                tableUpdate={tableUpdate}
                triggerRefresh={triggerRefresh}
            />
            {isModalOpen && <CreateLeaveReq
                isModalOpen={isModalOpen}
                handleModalClose={handleModalClose}
                triggerRefresh={triggerRefresh} />}
        </div>
    );
};


export default RequestListing;