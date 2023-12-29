import React from "react";
import {Radio} from "antd";
import {getIn} from "formik";

const Segment = (props) => {
    const {
        field: {name, value},
        form: {touched, errors, setFieldValue},
        label,
        options,
        required
    } = props

    const handleChange = (e) => {
        setFieldValue(name, e.target);
    }

    const touch = getIn(touched, name);
    const errorText = getIn(errors, name);

    return (
        <div>
            <label>{label}</label>
            <Radio.Group
                options= {options}
                value={value}
                onChange={handleChange}
                optionType="button"
                />
        </div>
    )
}

export default Segment;