import React, { FC } from 'react'
import classes from '../../css/FormControls.module.css'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../Validators/Validators'

/*const FormControl = ({meta, input, element, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <>
            {React.createElement(element, {...input, ...props, className: hasError ? classes.error : null}, null)}
            {hasError && <span>{meta.error}</span>}
        </>
    )
}*/

type FormControlPropsType = {
    meta: WrappedFieldMetaProps,
    children: React.ReactNode | undefined
}

const FormControl: FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

/*export const Textarea = (props) => {
    return <FormControl {...props} element={'textarea'}></FormControl>
}
export const Input = (props) => {
    return <FormControl {...props} element={'input'}></FormControl>
}*/

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}>
        <textarea {...input} {...restProps} />
    </FormControl>
}

export const Input: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}>
        <input {...input} {...restProps} />
    </FormControl>
}

export function createField<FormKeysType extends string>(component: FC<WrappedFieldProps>, 
                            name: FormKeysType, 
                            placeholder: string | undefined, 
                            type: string, 
                            validators: Array<FieldValidatorType>, 
                            text= '') {
    return <div>
        <Field 
            component={component} 
            name={name} 
            placeholder={placeholder} 
            type={type}
            validate={validators} />
        {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>