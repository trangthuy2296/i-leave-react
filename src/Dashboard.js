import React from 'react';
import { Table } from 'antd';

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
  return <Table dataSource={dataSource} columns={columns} />;
};

export default Dashboard;
