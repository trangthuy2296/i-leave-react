import { Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const dataSource = [
  {
    key: '1',
    name: 'John Doe',
    age: 25,
    address: '123 Main St',
  },
  {
    key: '2',
    name: 'Jane Doe',
    age: 30,
    address: '456 Oak St',
  },
  // Add more data as needed
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  // Add more columns as needed
];

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  return <div>

    <h1>Dashboard</h1>
    <Table dataSource={dataSource} columns={columns} />;
  </div>
};

export default Dashboard;
