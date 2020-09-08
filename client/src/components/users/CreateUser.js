import '../css/style.css';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createUser } from '../../actions/index';
import { isAllFilled, findEmptyFieldsInCreatingUser, isBlankForm } from '../../Services';
import CustomButton from '../forms/CustomButton';

const CreateUser = () => {
    const dispatch = useDispatch();
    const [errorUserExist, setErrorUserExist] = useState('');
    const hiddenFileInput = useRef(null);
    const history = useHistory();

    const handleClick = e => {
        e.preventDefault();
        hiddenFileInput.current.click();
    };

    const makeFile = (file, item) => {
        const {
            firstname,
            lastname,
            kind,
            phone,
            image
        }
            = item;
        file.set(`${firstname}`, firstname);
        file.set(`${lastname}`, lastname);
        file.set(`${kind}`, kind);
        file.set(`${phone}`, phone);
        file.append(`${image}`, image);
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
                        errors = findEmptyFieldsInCreatingUser(values, errors);
                        return errors;
                    }}
                >
                    {({ errors, setFieldError, setFieldValue, touched, values, handleChange }) => {
                        return (
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    const file = new FormData(e.target);
                                    makeFile(file, values);

                                    try {
                                        const response = await dispatch(createUser(file));
                                        if (response.status === 201) {
                                            history.push('/user/add/confirm');
                                        } else {
                                            if (response.error) {
                                                Object.keys(response.error.errors).map(key => {
                                                    if (response.error.errors[key]) {
                                                        setFieldError(`${key}`, response.error.errors[key].message);
                                                    }

                                                    return key;
                                                });
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
                                        <br />
                                        <div className="inline field">
                                            <a
                                                href="!#"
                                                onClick={handleClick}
                                            >
                                                Attach Image
                                                </a>
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
                                                {
                                                    values.image ?
                                                        values.image.slice(12, values.image.length) : ''}
                                                {values.image ?
                                                    <i
                                                        className="close link icon"
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            setFieldValue('image', '');
                                                        }}>
                                                    </i>
                                                    : ''
                                                }
                                            </div>
                                            <div>
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
                                    disabled={isAllFilled(values) ? true : false}
                                    value="Create"
                                />
                                <CustomButton
                                    onClick={e => {
                                        e.preventDefault();
                                        setFieldValue('firstname', '');
                                        setFieldValue('lastname', '');
                                        setFieldValue('kind', '');
                                        setFieldValue('phone', '');
                                        setFieldValue('image', '');
                                    }}
                                    style={{ margin: '25px' }}
                                    className="ui submit red button"
                                    disabled={isBlankForm(values) ? true : false}
                                    value="Clear"
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