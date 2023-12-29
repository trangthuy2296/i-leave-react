//import different things
import React, { useState } from 'react';
import { Form, Input, Button, Badge, Calendar, theme, Modal, DatePicker, Radio } from 'antd';

import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from 'antd/es/input/TextArea';
import { json } from 'react-router-dom';

//Create leave request schema
const schema = Yup.object().shape({
    startDate: Yup
        .date()
        .required("Please select start date"),
    endDate: Yup
        .date()
        .required("Please select end date"),
    duration: Yup
        .number(),
    indicator: Yup
        .string()
        .oneOf(["morning", "afternoon", "all-day"]),
    notes: Yup
        .string()
        .required("Please specify the notes")
        .max(8, "Please specify maximum 8 char"),

});





//handle the main screen
const CreateLeaveReq3 = () => {
    //define the event of Modal
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false)
    };




    //to initiate the date range selection
    const { RangePicker } = DatePicker;

    //for radio button 
    const [indicator, setIndicator] = useState("all_day");

    const onChangeIndicator = ({ target: { value } }) => {
        setIndicator(value)
    };

    //for formik
    const handleSubmit = (values) => {
        console.log("Form Data", values);
        alert("Form data: " + values.indicator + "and" + values.notes);
        setOpen(false);
    }



    return (
        <>

            <Button type='primary' onClick={showModal}>
                Create Leave Request
            </Button>

            <Modal
                open={open}
                title="Create New Leave Request"
                onCancel={handleCancel}
                width={712}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" htmlType='submit' onClick={handleSubmit}>
                        Send
                    </Button>,

                ]}>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        startDate: null,
                        endDate: null,
                        indicator: "all-day",
                        notes: ""
                    }}
                    validateOnChange>
                    {({
                        //the value to used in func below
                        values,
                        errors,
                        touched,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        setFieldValue

                    }) => (
                        //form elements
                        /* question:
                        why we need to set both value & name
                        we should put it in Form.Item or the exact input itself like DatePicker or TextArea
                        why text area can accept default onChange and DatePicker cant?
                        */
                        <Form layout='vertical' onFinish={handleSubmit} validationSchema={schema}>
                            <Form.Item
                                label={<label className='label-font'>Start Date</label>}
                                validateStatus={errors.startDate&& touched.startDate ? 'error' : 'success'}
                                help={errors.startDate}
                                >
                                <DatePicker 
                                    name='startDate'
                                    onChange = {(date) => setFieldValue('startDate', date)}/>
                                <br/>

                                

                            </Form.Item>

                            <Form.Item
                                label={<label className='label-font'>End Date</label>}
                                validateStatus={errors.endDate && touched.endDate? 'error' : 'success'}
                                help={errors.endDate}
                                >
                            
                                <DatePicker
                                    name='endDate'
                                    value={values.endDate}
                                    onChange={(date) =>setFieldValue('endDate', date)}>

                                </DatePicker>


                            </Form.Item>

                            <Form.Item
                                label={<label className='label-font'>Leave for</label>}
                                name={"indicator"}
                                value={values.indicator}>
                                <Radio.Group
                                    options={[
                                        { label: "All day", value: "all_day" },
                                        { label: "Morning", value: "morning" },
                                        { label: "Afternoon", value: "afternoon" }
                                    ]}
                                    onChange={onChangeIndicator}
                                    optionType='button'>

                                </Radio.Group>
                                {(errors.indicator && touched.indicator) ? errors.indicator :null}


                            </Form.Item>

                            <Form.Item
                                label={<label className='label-font'>Notes</label>}
                                name={"notes"}
                                value={values.notes}
                                validateStatus={errors.notes ? 'warning' : 'success'}
                                help={errors.notes}
                                
                            >
                                <TextArea
                                    placeholder='Message to your team on the leave days'
                                    name='notes'
                                    onChange={handleChange}
                                />

                            </Form.Item>

                            <p>I paste long long text here to test footer and stuff</p>
                            <br></br>
                            <p>I paste long long text here to test footer and stuff</p>
                            <br></br>
                            <p>I paste long long text here to test footer and stuff</p>
                            <br></br>

                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                            <Button type='button' onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Form>


                    )
                    }


                </Formik>


            </Modal>

        </>

    )
};


export default CreateLeaveReq3;