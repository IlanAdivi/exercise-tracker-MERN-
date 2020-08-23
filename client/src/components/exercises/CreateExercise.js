import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { createExercise, fetchUsers } from '../../actions/index';
import { isEmpty } from '../../Services';
import CustomButton from '../forms/CustomButton';
import LoadingForm from '../forms/LoadingForm';

const CreateExercise = () => {
    const [loading, setLoading] = useState(true);
    const [exercise, setExercise] = useState({
        username: '',
        userId: 0,
        users: []
    });
    const [errorDuplicate, setErrorDuplicate] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadingFetchUsersFromBackend() {
            const response = await dispatch(fetchUsers());
            if (response.status === 200) {
                const userNamesAndIdsArray = response.data.users.map(user => {
                    return {
                        fullname: `${user.firstname} ${user.lastname}`,
                        _id: `${user._id}`
                    }
                });
                setLoading(false);
                setExercise({
                    ...exercise,
                    username: `${response.data.users[0].firstname} ${response.data.users[0].lastname}`,
                    users: userNamesAndIdsArray,
                    userId: response.data.users[0]._id
                });
            }
        }
        loadingFetchUsersFromBackend();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const onChangeUsername = e => {
        // eslint-disable-next-line
        const selectedExercise = exercise.users.find(exerciseItem => {
            if (exerciseItem.fullname === e.target.value) {
                return exerciseItem._id
            }
        });
        setExercise({
            ...exercise,
            username: e.target.value,
            userId: selectedExercise._id
        });
    };

    const renderForm = () => {
        return (
            <Formik
                initialValues={{
                    course: '',
                    startTime: null,
                    endTime: null,
                    date: null
                }}
                validate={exercise => {
                    let errors = {};
                    if (!exercise.course) {
                        errors.course = "Field Course is required!";
                    }
                    return errors;
                }}>
                {({ errors, setFieldError, values, touched, setFieldValue, handleChange }) => {
                    return (
                        <Form
                            onSubmit={async e => {
                                console.log(values);
                                e.preventDefault();
                                const response = await dispatch(createExercise(values, exercise.userId));
                                if (response.status === 201) {
                                    history.push('/exercises');
                                } else {
                                    const { errors } = response.data;
                                    if (errors.course) {
                                        setFieldError('course', errors.course)
                                    }
                                    if (errors.hour) {
                                        setFieldError('startTime', errors.hour)
                                    }
                                    if (errors.date) {
                                        setFieldError('date', errors.date);
                                    }
                                    if (errors.errmsg) {
                                        setErrorDuplicate(errors.errmsg);
                                    } else {
                                        setErrorDuplicate('');
                                    }
                                }
                            }}>
                            < div className="ui segment" >
                                <div className="ui form">
                                    <div className="field">
                                        <label>Username: </label>
                                        <select
                                            className="ui dropdown"
                                            required
                                            value={exercise.username}
                                            onChange={e => onChangeUsername(e)}>
                                            {
                                                exercise.users.map((user, index) => (
                                                    <option
                                                        key={index}
                                                        value={user.fullname}
                                                    >
                                                        {user.fullname}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="field">
                                        <label>Course: </label>
                                        <Field
                                            name="course"
                                            placeholder="Enter Course"
                                            type="text"
                                            style={{
                                                borderColor:
                                                    errors.course && touched.course ?
                                                        'red' : ''
                                            }}
                                            onKeyUp={handleChange}
                                        />
                                        <div
                                            style={{ color: errors.course ? 'red' : '' }}>
                                            {errors.course}
                                        </div>
                                    </div>
                                    <div className="three fields">
                                        <div className="field">
                                            <label>StartTime: </label>
                                            <DatePicker
                                                name="startTime"
                                                placeholderText="h:mm aa"
                                                selected={values.startTime}
                                                onChange={hour => setFieldValue('startTime', hour)}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Time"
                                                dateFormat="h:mm aa"
                                                className={errors.startTime ? "red-border" : ""}
                                            />
                                            <div
                                                style={{ color: errors.startTime ? 'red' : '' }}>
                                                {errors.startTime}
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>EndTime: </label>
                                            <DatePicker
                                                name="endTime"
                                                placeholderText="h:mm aa"
                                                selected={values.endTime}
                                                onChange={hour => setFieldValue('endTime', hour)}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Time"
                                                dateFormat="h:mm aa"
                                                className={errors.startTime ? "red-border" : ""}
                                            />
                                        </div>

                                        <div className="field">
                                            <label>Date: </label>
                                            <DatePicker
                                                name="date"
                                                placeholderText="DD/MM/YYYY"
                                                selected={values.date}
                                                onChange={date => setFieldValue('date', date)}
                                                className={errors.date ? "red-border" : ""}
                                                minDate={new Date()}
                                            />
                                            <div
                                                style={{ color: errors.date ? 'red' : '' }}>
                                                {errors.date}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{ color: errorDuplicate ? 'red' : '' }}>
                                        {errorDuplicate}
                                    </div>
                                    <CustomButton
                                        className="ui submit black button"
                                        disabled={isEmpty(values) ? true : false}
                                        value="Create" />
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        );
    };

    const renderCreateExercise = () => {
        return (
            <div className="ui container">
                <br></br>
                <br></br>

                {loading === true ?
                    <LoadingForm />
                    :
                    <div>
                        <h3>Create New Exercise Log</h3>
                        {renderForm()}
                    </div>
                }
            </div>
        );
    };

    return (
        <div>
            {renderCreateExercise()}
        </div>
    );
};

export default CreateExercise;