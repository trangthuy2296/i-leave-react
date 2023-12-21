// Login.js
import React from 'react';
import { Form, Input, Button } from 'antd';
import bg from './Images/img-login.png';
import icon from './Images/ileave-icon.png';
import { Formik } from "formik";
import * as Yup from "yup";

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

  return (
    <div className="login-container">
      <div className="image-container" style={{ backgroundColor: loginBGRGB }}>
        {/* Add your big picture here */}
        <img
          src={bg}
          alt="Login Background"
          className="login-image"
        />
      </div>
      <div className="form-container">
        <div className="login-header">
        <img
          src={icon}
          alt="ileave icon"
        />
          <h1> Sign in to iLeave</h1>
          <p style={{ color: '#6A7882' }}>Welcome back!</p>
        </div>
        <Formik
        validationSchema={schema}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onFinish={handleSubmit} className="login-form">
            <Form.Item
              label={<span style={{ fontWeight: '600', fontSize: '12px' }}>Email</span>}
              name="email"
              validateStatus={errors.email && touched.email ? 'error' : ''}
              help={errors.email && touched.email && errors.email}
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
               
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ fontWeight: '600', fontSize: '12px' }}>Password</span>}
              name="password"
              validateStatus={errors.password && touched.password ? 'error' : ''}
              help={errors.password && touched.password && errors.password}
              labelCol={{ span: 24 }}
            >
              <Input.Password
                placeholder="Enter your password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            
            <Form.Item 
              wrapperCol={{ span: 24 }}
              >
              <Button type="primary" htmlType="submit" className="primary-button">
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