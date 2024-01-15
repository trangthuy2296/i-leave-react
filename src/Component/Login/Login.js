// Login.js
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import bg from '../../Images/img-login.png';
import icon from '../../Images/ileave-icon.png';
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from '../../Hook/useAuth';
import '../../App.css'
import './Login.css'

// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const loginBGRGB = 'rgb(236,213,255)';

const Login = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const { accessToken, message: msg } = await response.json();
        await handleLogin({accessToken});
        message.success(msg);

      } else {
        const {message:msg } = await response.json();
        message.error(msg);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      
      {/* Left section*/}

      <div className="image-container" style={{ backgroundColor: loginBGRGB }}>
        {/* Add your big picture here */}
        <img
          src={bg}
          alt="Login Background"
          className="login-image"
        />
      </div>

      {/* Right section*/}

      <div className="form-container">
        <div className="login-header">
          <img
            src={icon}
            alt="ileave icon"
          />
          <h1> Sign in to iLeave</h1>
          <p style={{ color: '#6A7882' }}>Welcome back!</p>
        </div>

        {/* Signin form*/}
        
        <Formik
          validationSchema={schema}
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onFinish={handleSubmit} className="login" layout="vertical">
              <Form.Item
                label={<label>Email</label>}
                name="email"
                validateStatus={errors.email && touched.email ? 'error' : ''}
                help={errors.email && touched.email && <span className="error-message-form">{errors.email}</span>}
              >
                <Input
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  //onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                label={<label>Password</label>}
                name="password"
                validateStatus={errors.password && touched.password ? 'error' : ''}
                help={errors.password && touched.password && <span className="error-message-form">{errors.password}</span>}
              >
                <Input.Password
                  placeholder="Enter your password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  //onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 24 }}
              >
                <Button size="large" type="primary" htmlType="submit" block>
                  Sign in {/* Use the "primary-button" class */}
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;