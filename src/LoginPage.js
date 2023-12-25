import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Input, Button, Row, Col } from 'antd';
import './LoginPage.css'; // Import your custom CSS file
import Logo from './logo.svg'
import Bg from './assets/images/img-login.jpg'
import validationSchema from './validationSchema';


const LoginPage = () => {
    const initialValues = {
        email: '',
        password: '',
    };

    const onSubmit = (values) => {
        // Handle form submission logic here
        console.log(values);
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

                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form >
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