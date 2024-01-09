//import different things
import React, { useState } from 'react';
import { Form, Button, Modal, DatePicker, Radio, message } from 'antd';

import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import TextArea from 'antd/es/input/TextArea';
import { json } from 'react-router-dom';
import { isSameDay } from 'date-fns';
import api from './ApiDefine';
import dayjs from 'dayjs';

//Create leave request schema
const schema = Yup.object().shape({
    startDate: Yup
        .string()
        .required("Please select start date"),
    endDate: Yup
        .date()
        .required("Please select end date"),

    timeSlot: Yup
        .string()
        .required("Please specify the leave duration"),
    note: Yup
        .string()
        .required("Please specify the note"),

});




const TSfullOptions = [
    { label: "Full day", value: "FullDay" },
    { label: "Morning", value: "Morning" },
    { label: "Afternoon", value: "Afternoon" }
];

const TSFDOptions = [
    { label: "Full day", value: "FullDay" },
    { label: "Morning", value: "Morning", disabled: true },
    { label: "Afternoon", value: "Afternoon", disabled: true }
];



//handle the main screen
const EditLeaveReq = ({ isModalOpen, handleModalClose, requestData, triggerRefresh }) => {

    

    //to initiate the date range selection
    console.log ("request data when render edit modal", requestData);
    //if (requestData) {console.log ("Convert start date to moment", moment(requestData.startDate))};
    const { RangePicker } = DatePicker;

    const [leaveFor1Day, setLeaveFor1Day] = useState(true);

    const handleModalSubmit = async (values) => {
        try {
            const leaveRequest = {
                startDate: values.startDate,
                endDate: values.endDate,
                timeSlot: values.timeSlot,
                note: values.note
            }

            const response = await api.put(`/requests/${requestData._id}`, leaveRequest);
            message.success("Updated successfully");
            handleModalClose();
            triggerRefresh();


        } catch (err) {

            const msg = err.response?.data?.message ?? "Something went wrong";
            message.error(msg);


        }
    };




    return (
        <>  
            <Modal
                open={isModalOpen}
                title="Edit Leave Request"
                onCancel={handleModalClose}
                destroyOnClose={true}
                width={712}
                footer={null}>
                <Formik
                    enableReinitialize
                    validationSchema={schema}
                    initialValues={{
                        startDate: dayjs(requestData.startDate),
                        endDate: dayjs(requestData.endDate),
                        timeSlot: requestData?.timeSlot,
                        note: requestData?.note
                    }}
                    onSubmit={handleModalSubmit}
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


                    
                        <Form layout='vertical' >
                            <p>Requested by {requestData.createdBy?.name}</p>
                            <Form.Item
                                label={<label className='label-font'>Pick the dates</label>}
                                validateStatus={(errors.startDate || errors.endDate) && touched.startDate ? 'error' : 'success'}
                                help={(errors.startDate || errors.endDate) && touched.startDate ? "Please select leave duration" : null}>

                                <RangePicker
                                    name='leavePeriod'
                                    onBlur={handleBlur}
                                    defaultValue={[values.startDate, values.endDate]}
                                    onChange={(dates) => {
                                        if (dates) {
                                            setFieldValue('startDate', dates[0].startOf('day'));
                                            setFieldValue('endDate', dates[1].startOf('day'));
                                            if (isSameDay(dates[0].toDate(), dates[1].toDate())) {
                                                setLeaveFor1Day(true);
                                            } else {
                                                setLeaveFor1Day(false);
                                                setFieldValue('timeSlot', "FullDay");
                                            };

                                        } else {
                                            setFieldValue('startDate', null);
                                            setFieldValue('endDate', null);
                                            setLeaveFor1Day(true);
                                        };
                                        console.log("timeslot value", values.timeSlot);
                                    }}>
                                </RangePicker>
                                <br />

                            </Form.Item>

                            <Form.Item
                                label={<label className='label-font'>Duration</label>}
                                validateStatus={errors.timeSlot && touched.timeSlot ? 'error' : ''}
                                help={errors.timeSlot && touched.timeSlot ? errors.timeSlot : null}
                            >

                                <Radio.Group
                                    options={leaveFor1Day ? TSfullOptions : TSFDOptions}
                                    name='timeSlot'
                                    value={values.timeSlot}
                                    defaultValue={values.timeSlot}
                                    onChange={handleChange}
                                    onBlur={({ target: { value } }) => setFieldValue('timeSlot', value)}
                                    optionType='button'>

                                </Radio.Group>


                            </Form.Item>

                            <Form.Item
                                label={<label className='label-font'>Note</label>}
                                name={"note"}
                                validateStatus={errors.note && touched.note ? 'error' : 'success'}
                                help={errors.note && touched.note ? errors.note : null}>

                                <TextArea
                                    placeholder='Message to your team on the leave days'
                                    name='note'
                                    defaultValue={values.note}
                                    value={values.note}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </Form.Item>

                            <Button key="cancel" onClick={handleModalClose}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleSubmit}>
                                Send
                            </Button>

                        </Form>


                    )

                    }



                </Formik>
            </Modal>



        </>

    )
};


export default EditLeaveReq;