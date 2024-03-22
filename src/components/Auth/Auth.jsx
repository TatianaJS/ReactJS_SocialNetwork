import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Authorization } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import classes from '../../css/Auth/Auth.module.css';
import { Input, createField } from '../../utils/FormControls/FormControls';
import { requiredField } from '../../utils/Validators/Validators';

const SignInForm = ({handleSubmit, error}) => {
    return ( 
        <form 
            className={classes.signin_form}
            onSubmit={handleSubmit}>
            { createField(Input, 'email', 'E-mail', 'text', [requiredField], null) }
            { createField(Input, 'password', 'Пароль', 'password', [requiredField], null) }
            <label className='input_checkbox__customized'>
                { createField(Input, 'rememberMe', null, 'checkbox', [], 'Запомнить меня') }
            </label>
            { error && <div className='form_error'>{error}</div> }
            <div>
                <button type='submit'>
                    Авторизоваться
                </button>
            </div>
        </form>
    )
}

const SignInReduxForm = reduxForm({form: 'signIn'})(SignInForm)

const Auth = (props) => {
    const onSubmit = (formData) => {
        props.Authorization(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuthorized) {
        return <Navigate to={'/profile'} />
    }

    return <div>
        <h1 className={ classes.page_title }>
            Авторизация
        </h1>
        <SignInReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuthorized: state.auth.isAuthorized
});

export default connect(mapStateToProps, {Authorization})(Auth);