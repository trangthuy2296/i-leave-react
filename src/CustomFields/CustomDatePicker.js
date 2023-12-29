import React from "react";
import {DatePicker} from "antd";
import {getIn} from "formik";

const CustomDatePicker = (props) => {

    const {
        field: { name, value },
        form: { touched, errors, setFieldValue },
        label,
        required,
    } = props;

    const handleChange = (date, dateString) => {
        console.log(date, dateString)
        setFieldValue(name, dateString);

    }

    const touch = getIn(touched, name)
    const errorText = getIn(errors, name)
    return (
        <div>
            <label>{label}</label>
            <DatePicker
                value={value}
                onChange={handleChange}
            />
            {
                errorText
                && <div> {errorText} </div>
            }
            <br/>
        </div>
    )
}

export default CustomDatePicker;