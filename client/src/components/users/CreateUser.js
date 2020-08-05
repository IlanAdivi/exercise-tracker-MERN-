import '../css/style.css';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createUser } from '../../actions/index';
import { isEmpty } from '../../Services';
import CustomButton from '../forms/CustomButton';

const CreateUser = () => {
    const dispatch = useDispatch();
    const [errorUserExist, setErrorUserExist] = useState('');
    const hiddenFileInput = useRef(null);
    const history = useHistory();

    const handleClick = e => {
        hiddenFileInput.current.click();
    };

    const renderCreateUser = () => {
        return (
            <div className="ui container">
                <br></br>
                <br></br>
                <h3>Create New User</h3>
                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        kind: '',
                        phone: '',
                        image: undefined
                    }}
                    validate={values => {
                        let errors = {};
                        if (!values.firstname) {
                            errors.firstname = "Field is required";
                        }

                        if (!values.lastname) {
                            errors.lastname = "Field is required";
                        }

                        if (!values.kind) {
                            errors.kind = "Field is required";
                        }

                        if (!values.phone) {
                            errors.phone = "Field is required";
                        }
                        return errors;
                    }}
                >
                    {({ errors, setFieldError, touched, values, handleChange }) => {
                        return (
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    const file = new FormData(e.target);
                                    file.set('firstname', values.firstname);
                                    file.set('lastname', values.lastname);
                                    file.set('kind', values.kind);
                                    file.set('phone', values.phone);
                                    file.append("image", values.image);

                                    try {
                                        const response = await dispatch(createUser(file));
                                        if (response.status === 201) {
                                            history.push('/user/add/confirm');
                                        } else {
                                            if (response.error.errors.firstname) {
                                                setFieldError('firstname', response.error.errors.firstname.message);
                                            }

                                            if (response.error.errors.lastname) {
                                                setFieldError('lastname', response.error.errors.lastname.message);
                                            }

                                            if (response.error.errors.kind) {
                                                setFieldError('kind', response.error.errors.kind.message);
                                            }

                                            if (response.error.errors.phone) {
                                                setFieldError('phone', response.error.errors.phone.message);
                                            }

                                            if (response.message) {
                                                setErrorUserExist(response.message);
                                            } else {
                                                setErrorUserExist('');
                                            }
                                        }
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                                }
                            >
                                < div className="ui segment" >
                                    <div className="ui form">
                                        <div className="field">
                                            <label>First Name</label>
                                            <Field
                                                name="firstname"
                                                placeholder="Enter your Firstname"
                                                type="text"
                                                style={{ borderColor: errors.firstname && touched.firstname ? 'red' : '' }}
                                                onKeyUp={handleChange}
                                            />
                                            <ErrorMessage
                                                name="firstname"
                                                component="div"
                                                style={{ color: errors.firstname ? 'red' : '' }} />
                                        </div>

                                        <div className="field">
                                            <label>Last Name</label>
                                            <Field
                                                name="lastname"
                                                placeholder="Enter your Lastname"
                                                type="text"
                                                style={{ borderColor: errors.lastname && touched.lastname ? 'red' : '' }}
                                                onKeyUp={handleChange}
                                            />
                                            <ErrorMessage
                                                name="lastname"
                                                component="div"
                                                style={{ color: errors.lastname ? 'red' : '' }} />
                                        </div>

                                        <div className="field">
                                            <label>Kind</label>
                                            <Field
                                                name="kind"
                                                type="text"
                                                placeholder="Enter your Kind"
                                                style={{ borderColor: errors.kind && touched.kind ? 'red' : '' }}
                                                onKeyUp={handleChange}
                                            />
                                            <ErrorMessage
                                                name="kind"
                                                component="div"
                                                style={{ color: errors.kind ? 'red' : '' }} />
                                        </div>
                                        <div className="field">
                                            <label>Phone</label>
                                            <Field
                                                name="phone"
                                                placeholder="Enter your Phone number"
                                                type="text"
                                                style={{ borderColor: errors.phone && touched.phone ? 'red' : '' }}
                                                onKeyUp={handleChange}
                                            />
                                            <ErrorMessage
                                                name="phone"
                                                component="div"
                                                style={{ color: errors.phone ? 'red' : '' }} />
                                        </div>
                                        <div className="field">
                                            <label>Attach Image</label>
                                            <div
                                                className="ui button"
                                                onClick={handleClick}>
                                                Browse
                                            </div>
                                            <Field
                                                type="file"
                                                name="image"
                                                innerRef={hiddenFileInput}
                                                encType="multipart/form-data"
                                                onKeyUp={handleChange}
                                                style={{ display: 'none' }}
                                                value={values.image || ''}
                                            />
                                            <div>
                                                {values.image ? values.image.slice(12, values.image.length) : ''}
                                            </div>
                                        </div>

                                    </ div>
                                </ div>
                                <div
                                    style={{ color: errorUserExist ? 'red' : '' }}>
                                    {errorUserExist}
                                </div>

                                <CustomButton
                                    type="submit"
                                    className="ui submit black button"
                                    disabled={isEmpty(values) ? true : false}
                                    value="Create"
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </div >
        );
    };

    return (
        <div>{renderCreateUser()}</div>
    );
};

export default CreateUser;