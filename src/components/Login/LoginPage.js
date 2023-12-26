import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Input, Button, Row, Col, message } from 'antd';
import './LoginPage.css'; // Import your custom CSS file
import Logo from '../../Images/logo.svg'
import Bg from '../../Images/img-login.png';
import validationSchema from '../../validationSchema';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

    const initialValues = {
        email: '',
        password: '',
    };
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:7003/api/login', {
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
                // If login is successful, store the token in local storage or manage it as needed
                const { accessToken } = await response.json();
                localStorage.setItem('accessToken', accessToken);
                message.success('Login successful!');
                console.log('About to navigate to /');
                navigate('/');
            } else {
                // Handle login error
                console.error('Login failed');
                // Display an error message
                message.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Row className="login-page">
            {/* Left Section with Big Image */}
            <Col className="left-section" >
                <img
                    src={Bg}
                    alt="Login Background"
                    className="background-image"
                />
            </Col>

            {/* Right Section with Login Form */}
            <Col className="right-section">
                <div className="login-form-container">
                    <img style={{ paddingBottom: 32 }} src={Logo} alt='logo'></img>

                    <h1>Login in to ileave</h1>
                    <p style={{ color: 'gray' }}>Welcome back! Please enter your details</p>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form onFinish={handleSubmit}>
                            <div style={{ paddingBottom: 16 }}>
                                <div style={{ paddingBottom: 8 }}> <label htmlFor="email"><b>Email</b></label></div>
                                <Field className="custom-input-item" type="text" id="email" name="email" as={Input} 
                                    render={({ field, form }) => (
                                        <Input
                                            className="custom-input-item"
                                            {...field}
                                            style={{
                                                borderColor:
                                                    form.touched.email && form.errors.email ? 'red' : '',
                                            }}
                                        />
                                    )} />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>

                            <div style={{ paddingBottom: 24 }}>
                                <div style={{ paddingBottom: 8 }}><label htmlFor="password"><b>Password</b></label></div>
                                <Field className="custom-input-item" type="password" id="password" name="password" as={Input.Password}
                                    render={({ field, form }) => (
                                        <Input.Password
                                            className="custom-input-item"
                                            {...field}
                                            style={{
                                                borderColor:
                                                    form.touched.password && form.errors.password ? 'red' : '',
                                            }}
                                        />
                                    )}
                                />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>

                            <div>
                                <Button type="primary" htmlType="submit" className='login-button'>
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </Col>
        </Row>
    );
};

export default LoginPage;