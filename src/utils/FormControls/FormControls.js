import React from 'react';
import classes from '../../css/FormControls.module.css';
import { Field } from 'redux-form';

const FormControl = ({meta, input, element, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <>
            {React.createElement(element, {...input, ...props, className: hasError ? classes.error : null}, null)}
            {hasError && <span>{meta.error}</span>}
        </>
    )
}

export const Textarea = (props) => {
    return <FormControl {...props} element={'textarea'}></FormControl>
}

export const Input = (props) => {
    return <FormControl {...props} element={'input'}></FormControl>
}

export const createField = (component, name, placeholder, type, validators, text = '') => (
    <div>
        <Field 
            component={component} 
            name={name} 
            placeholder={placeholder} 
            type={type}
            validate={validators} />
        {text}
    </div>
)