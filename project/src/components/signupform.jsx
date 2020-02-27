import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const SingUp = ({ values, touched, errors, status }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        status && setData(data => [...data, status])
    }, [status])

    return (
        <div>
            <h2>Sign up!</h2>
            <Form>
                <label htmlFor='name'>Name:</label>
                <Field id='name' type='text' name='name' placeholder='Name Here' />
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}

                <label htmlFor="email">Email:</label>
                <Field id='email' type='text' name='email' placeholder='Email Here' />
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}

                <label htmlFor="password">Password:</label>
                <Field id='password' type='password' name='password' placeholder='Password here' />
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}

                <label htmlFor="tos">Accept Terms</label>
                <Field className='center' checked={values.tos} type='checkbox' id='tos' name='tos' />
                {touched.tos && errors.tos && (
                    <p>{errors.tos}</p>
                )}

                <label htmlFor="role">Role:</label>
                <Field as='select' id='role' name='role'>
                    <option value='admin'>Admin</option>
                    <option value='moderator'>moderator</option>
                    <option value='user'>User</option>
                </Field>

                <button type='submit'>Sign up</button>
            </Form>
            {data.map(item => (
                <ul>
                    <li>Name: {item.name}</li>
                    <li>Email: {item.email}</li>
                    <li>Role: {item.role}</li>
                </ul>
            ))}
        </div>
    )
}
const FormikSignUp = withFormik({
    mapPropsToValues({ name, email, password, tos, role }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false,
            role: role || '',
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, 'not long enough').required('name required'),
        password: Yup.string().min(3, 'not long enough').required('password required'),
        email: Yup.string().email('not a valid email').required('Email is required'),
        tos: Yup.boolean().oneOf([true], 'Must accept Terms Of Aggreements').required('Must accept Terms Of Aggreements'),
        role: Yup.string().oneOf(['admin', 'moderator', 'user']).required('Please Choose One')
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        axios.post('https://reqres.in/api/users/', values)
            .then(response => {
                console.log(response)
                setStatus(response.data)
                resetForm()
            })
            .catch(err => {
                console.log(err)
            })
    }
})(SingUp)

export default FormikSignUp