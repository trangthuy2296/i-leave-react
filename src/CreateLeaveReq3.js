//import different things
import React, { useState } from 'react';
import { Form, Input, Button, Badge, Calendar, theme, Modal, DatePicker, Radio, message, Segmented } from 'antd';

import { ErrorMessage, Formik, Field } from 'formik';
import * as Yup from 'yup';
import TextArea from 'antd/es/input/TextArea';
import { json } from 'react-router-dom';
import moment from 'moment';
import CustomTextArea from './CustomFields/CustomTextArea';
import CustomDatePicker from './CustomFields/CustomDatePicker';
import Segment from './CustomFields/Segment';



const schema = Yup.object().shape({
    startDate: Yup
        .string()
        .required("Please select start date"),
    endDate: Yup
        .string()
        .required("Please select end date"),
    timeSlot: Yup
        .string(),
    notes: Yup
        .string()
        .required("Please note the message"),

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



    //write func to createRequest , do i need to overwrite handle submit
    const handleSubmit = async (values) => {
        try {
            console.log(values)
            setLoading(true);
            //const formatedStartDate = values.startDate ? values.startDate.utc().format() : null;
            //const formatedEndDate = values.endDate ? moment.utc(values.endDate).format() : null;
            // console.log(formatedStartDate);
            // console.log(formatedEndDate);
            const response = await fetch('http://localhost:7003/api/requests', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    createdBy: "658cddce8f900b7214fe4283",
                    startDate: values.startDatea,
                    endDate: values.endDate,
                    timeSlot: values.timeSlot,
                    note: values.notes
                })
            });

            if (response.ok) {
                setOpen(false);
                alert('Create request successfully');
            } else {
                console.error('Create request unsuccessfully');
                const { message: errorMsg } = await response.json();
                message.error(errorMsg);
            }
        } catch (error) {
            alert("Error");
        } finally {
            setLoading(false);
        }

    };

    const timeSlotOptions = [
        { label: "Full day", value: "FullDay" },
        { label: "Morning", value: "Morning" },
        { label: "Afternoon", value: "Afternoon" }
    ];


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
                validateOnChange={false}
                validateOnBlur={true}>
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

                    <Modal
                        open={open}
                        title="Create New Leave Request"
                        onCancel={handleCancel}
                        width={712}
                        footer={[
                            <Button key="cancel" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type='primary' onClick={handleSubmit}>
                                Send
                            </Button>,

                        ]}>
                        <Form layout='vertical' validationSchema ={schema} onSubmit ={handleSubmit} >

                            <Field
                                name="startDate"
                                label="Start Date"
                                value={values.startDate}
                                component={CustomDatePicker}
                            />
                            <br />
                            <Field
                                name="endDate"
                                label="End Date"
                                component={CustomDatePicker}
                            />

                            <br />
                            <Field
                                name="timeSlot"
                                label="Duration"
                                options={timeSlotOptions}
                                component={Segment}
                            />
                            <br />
                            <Field
                                name="note"
                                label="Note"
                                component={CustomTextArea}
                            />

                        </Form>

                    </Modal>
                )

                }



            </Formik>




        </>

    )
};


export default CreateLeaveReq3;