//import different things
import React, { useState } from 'react';
import { Form, Input, Button, Badge, Calendar, theme, Modal, DatePicker, Radio, message } from 'antd';

import { ErrorMessage, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from 'antd/es/input/TextArea';
import { json } from 'react-router-dom';
import moment from 'moment';

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
    timeSlot: Yup
        .string()
        .required("Please specify the leave duration"),
    notes: Yup
        .string()
        .required("Please specify the notes")
        .max(8, "Please specify maximum 8 char"),

});





//handle the main screen
const CreateLeaveReq2 = () => {
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

    //write func to createRequest , do i need to overwrite handle submit
    const handleSubmit = async (values) => {
        try {
            return console.log(values);
            setLoading(true);
            const response = await fetch('http://localhost:7003/api/requests', {
                method : 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify ({
                    createdBy : "658cddce8f900b7214fe4283",
                    startDate : formatedStartDate,
                    endDate: formatedEndDate,
                    timeSlot: values.timeSlot,
                    note: values.notes
                })
            });

            if (response.ok) {
                setOpen(false);
                alert('Create request successfully');
            } else {
                console.error('Create request unsuccessfully');
                const {message: errorMsg} = await response.json();
                message.error(errorMsg);
            }
        } catch (error) {
            alert("Error")
        } finally {
            setLoading(false)
        }

    }





    return (
        <>

            <Button type='primary' onClick={showModal}>
                Create Leave Request
            </Button>


            <Formik
                validationSchema={schema}
                initialValues={{
                    startDate: null,
                    endDate: null,
                    timeSlot: "FullDay",
                    notes: ""
                }}
                onSubmit={handleSubmit} 
                validateOnChange ={false}
                validateOnBlur = {true}>
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
                    1. why we need to set both value & name
                    2. we should put it in Form.Item or the exact input itself like DatePicker or TextArea
                    3. why text area can accept default onChange and DatePicker cant?
                    4. why need to setFieldValue for Radiobutton but no for text area
                    5. should backend get the id of current user and createRequest instead of front end 
                    6. cannot really set date
                    */
                    <Modal
                        open={open}
                        title="Create New Leave Request"
                        onCancel={handleCancel}
                        width={712}
                        footer={[
                            <Button key="cancel" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleSubmit}>
                                Send
                            </Button>,

                        ]}>
                        <Form layout='vertical'  validationSchema={schema}>
                            <Form.Item
                                label={<label className='label-font'>Start Date</label>}
                                hasFeedback
                                validateStatus={errors.startDate && touched.startDate ? 'error' : 'success'}
                                help={errors.startDate}
                            >
                                <DatePicker
                                    name='startDate'
                                    value={values.startDate}
                                    onBlur={handleBlur}
                                    onChange={(date) => setFieldValue('startDate', date)}>
                                    </DatePicker>
                                <br />

                            </Form.Item>

                            <Form.Item
                                label={<label className='label-font'>End Date</label>}
                                validateStatus={errors.endDate  ? 'error' : 'success'}
                                help={errors.endDate}
                            >

                                <DatePicker
                                    name='endDate'
                                    value={values.endDate}
                                    onChange={(date) => setFieldValue('endDate', date)}
                                    onBlur={handleBlur}>

                                </DatePicker>
                                


                            </Form.Item>

                            <Form.Item
                                label={<label className='label-font'>Duration</label>}
                                validateStatus={errors.timeSlot ? 'error': ''}
                                help={errors.timeSlot}>

                                <Radio.Group
                                    options={[
                                        { label: "Full day", value: "FullDay" },
                                        { label: "Morning", value: "Morning" },
                                        { label: "Afternoon", value: "Afternoon" }
                                    ]}
                                    name='timeSlot'
                                    value={values.timeSlot}
                                    onChange={handleChange}
                                    onBlur={({target: {value}}) => setFieldValue('timeSlot', value)}
                                    optionType='button'>

                                </Radio.Group>


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
                                    onBlur={handleBlur}
                                />

                            </Form.Item>

                        </Form>

                        </Modal>            
                        )
                        
                    }
                   


            </Formik>




        </>

    )
};


export default CreateLeaveReq2;