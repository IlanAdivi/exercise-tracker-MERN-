import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { updateUser, fetchUserById } from '../../actions/index';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import LoadingForm from '../forms/LoadingForm';
import CustomButton from '../forms/CustomButton';

const UpdateUser = props => {
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState({
        imageUrl: null,
        firstname: '',
        lastname: '',
        kind: '',
        phone: ''
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const userId = props.match.params.id;

    useEffect(() => {
        async function loadingFetchUserFromBackend() {
            const response = await dispatch(fetchUserById(userId));
            setSelectedUser(response.data.user);
            setLoading(false);
        }
        loadingFetchUserFromBackend();
    }, [dispatch, userId]);

    const renderUpdateUser = () => {
        return (
            <div className="ui container">
                <br />
                {
                    loading === true
                        ?
                        <LoadingForm /> :
                        <div>
                            <div className="ui celled list">
                                <img
                                    src={selectedUser.imageUrl}
                                    alt=""
                                    className="ui small image"
                                />
                                <div className="item">
                                    <div className="content">
                                        <div className="header">Firstname: </div>
                                        {selectedUser.firstname}
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="content">
                                        <div className="header">Lastname: </div>
                                        {selectedUser.lastname}
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="content">
                                        <div className="header">Kind: </div>
                                        {selectedUser.kind}
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="content">
                                        <div className="header">Phone: </div>
                                        {selectedUser.phone.slice(0, 3)}-{selectedUser.phone.slice(3, 11)}
                                    </div>
                                </div>
                            </div>
                            <Formik
                                initialValues={{
                                    phone: ''
                                }}
                                validate={values => {
                                    let errors = {};
                                    if (!values.phone) {
                                        errors.phone = "Field Phone is required!";
                                    }
                                    return errors;
                                }}>
                                {({ errors, setFieldError, touched, values, handleChange }) => {
                                    return (
                                        <Form
                                            onSubmit={async e => {
                                                e.preventDefault();
                                                const response = await dispatch(updateUser(userId, values.phone));
                                                if (response.status === 200) {
                                                    history.push('/users');
                                                } else {
                                                    if (response.phone) {
                                                        setFieldError('phone', response.phone.message);
                                                    }
                                                }
                                            }}
                                        >
                                            < div className="ui segment" >
                                                <div className="ui form">
                                                    <div className="field">
                                                        <label>Phone</label>
                                                        <Field
                                                            name="phone"
                                                            placeholder="Enter Your Phone"
                                                            type="text"
                                                            onKeyUp={handleChange}
                                                            style={{ borderColor: errors.phone && touched.phone ? 'red' : '' }}
                                                        />
                                                        <ErrorMessage
                                                            name="phone"
                                                            component="div"
                                                            style={{ color: errors.phone ? 'red' : '' }}
                                                        />
                                                    </div>
                                                </ div>
                                            </div>
                                            <CustomButton
                                                type="submit"
                                                className="ui black submit button"
                                                disabled={!values.phone ? true : false}
                                                value="Update" />
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                }
            </div>
        );
    };

    return (
        <div>{renderUpdateUser()}</div>
    );
};

export default UpdateUser;