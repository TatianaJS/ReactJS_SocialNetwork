import React, { FC } from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { FilterType } from '../../redux/usersReducer'
import { useSelector } from 'react-redux'
import { getUsersFilter } from '../../redux/usersSelectors'
import classes from '../../css/Users/SearchFriends.module.css'

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friend: FriendFormType
}

type UsersSearchPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: FC<UsersSearchPropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, {setSubmitting}: FormikHelpers<FormType>) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div className={classes.search_friends}>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}>
            {({
                isSubmitting
            }) => (
                <Form>
                    <Field type='text' name='term' />
                    <Field name='friend' as='select'>
                        <option value='null'>Все</option>
                        <option value='true'>Followed</option>
                        <option value='false'>Unfollowed</option>
                    </Field>
                    <button 
                        type='submit'
                        disabled={isSubmitting}>
                            Отправить
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})