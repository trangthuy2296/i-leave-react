// Login.js
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Col, Divider} from 'antd';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    // Handle login logic here
    console.log('Received values:', values);
    setLoading(true);

    // Simulate login (replace this with your actual login logic)
    setTimeout(() => {
      setLoading(false);
      console.log('Login successful!');
  }, 1000);
};

  return (
    <div className="login-container">
    <div className="image-container">
    </div>
    <div className="form-container">

      <Form
        name="login-form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
      <Form.Item
      name="username"
      rules={[{ required: false, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: false, message: 'Please input your password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
          Log in
        </Button>

      </Form.Item>
        </Form>
        </div>
        </div>
  );
};


export default Login;
