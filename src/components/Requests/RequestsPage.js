import React, { useState, useEffect } from 'react';
import { Layout, Select, Button, Modal } from 'antd';
import {
    PlusCircleOutlined,
} from '@ant-design/icons';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import RequestTableList from './RequestTableList';
import api from '../ApiDefine';

const { Content } = Layout;

const Requests = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //Date filter
    const [fromDate, setFromDate] = useState(startOfDay(new Date())); // Start of current day
    const [toDate, setToDate] = useState(endOfDay(new Date())); // End of current day
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
        }
        //setFromDate(fromDate);
        //setToDate(toDate);
    };


    const [userID, setUserID] = useState('all');
    const [userOptions, setUserOptions] = useState([]);

    const fetchUserListing = async () => {
        try {

            const response = await api.get('/users');
            console.log('Response:', response);

            const usernames = response.data.map((user) => ({
                value: user._id, // Replace with user ID or unique identifier
                label: user.name, // Replace with the property containing username
            }));

            setUserOptions(usernames);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserListing();
    }, []);

    const handleMemberChange = (value) => {
        setUserID(value);
    };

    useEffect(() => {
        // Call the API with updated filter values (fromDate, toDate, userID)
        // Fetch data for the table using the updated filters
    }, [fromDate, toDate, userID]);


    return (
        <Layout>
            <Content style={{ background: "#ffffff" }}>
                <div className='justify-between' style={{ paddingBottom: 16 }}>
                    <div style={{ gap: 16, display: 'inline-flex', alignItems: 'center' }}>
                        Date
                        <Select
                            defaultValue="thisWeek"  // Set the default value to "thisWeek"
                            style={{ width: 200, height: 40 }}
                            onChange={handleDateChange}
                            options={[
                                { value: 'all', label: 'All' },
                                { value: 'today', label: 'Today' },
                                { value: 'thisWeek', label: 'This week' },
                                { value: 'thisMonth', label: 'This month' }
                            ]}
                        />
                        Member
                        <Select
                            defaultValue="all"
                            style={{ width: 200, height: 40 }}
                            onChange={handleMemberChange}
                            options={[
                                { value: 'all', label: 'All' },
                                ...userOptions,
                            ]}
                        />

                    </div>
                    <Button type="primary" icon={<PlusCircleOutlined />} onClick={showModal}>
                        Create New Request
                    </Button>
                    <Modal title="Create New Request" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Some contents...</p>
                    </Modal>
                </div>

                <RequestTableList
                    fromDate={fromDate}
                    toDate={toDate}
                    userID={userID}
                />
            </Content>
        </Layout>
    );
};

export default Requests;