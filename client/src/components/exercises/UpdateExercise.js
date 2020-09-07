import React, {
    useState,
    useEffect
}
    from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form } from 'formik';
import '../css/style.css';

import {
    updateExercise,
    fetchExerciseById
}
    from '../../actions';

import { isAllFilled } from '../../Services';
import { useHistory } from 'react-router-dom';
import LoadingForm from '../forms/LoadingForm';
import CustomButton from '../forms/CustomButton';

const UpdateExercise = props => {
    const [loading, setLoading] = useState(true);
    const [selectedExercise, setSelectedExercise] = useState({
        imageUrl: null,
        firstname: '',
        lastname: '',
        kind: '',
        phone: '',
        course: '',
        startTime: null,
        endTime: null,
        date: null
    });
    const dispatch = useDispatch();
    const history = useHistory();
    const exerciseId = props.match.params.id;

    useEffect(() => {
        async function loadingFetchExerciseFromBackend() {
            const response = await dispatch(fetchExerciseById(exerciseId));
            if (response.status === 200) {
                setSelectedExercise(response.data.exercise);
                setLoading(false);
            }
        }
        loadingFetchExerciseFromBackend();
    }, [dispatch, exerciseId]);

    const renderUpdateExercise = () => {
        return (
            <div className="ui container">
                <br></br>
                <br></br>
                {loading === true
                    ?
                    <LoadingForm /> :
                    <div className="ui celled list">
                        <img
                            src={selectedExercise.user.imageUrl}
                            alt=""
                            className="ui small image"
                        />
                        <div className="item">
                            <div className="content">
                                <div className="header">Firstname: </div>
                                {selectedExercise.user.firstname}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Lastname: </div>
                                {selectedExercise.user.lastname}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Kind: </div>
                                {selectedExercise.user.kind}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Phone: </div>
                                {selectedExercise.user.phone.slice(0, 3)}-{selectedExercise.user.phone.slice(3, 11)}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Course: </div>
                                {selectedExercise.course}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Start Time: </div>
                                {selectedExercise.startTime}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">End Time: </div>
                                {selectedExercise.endTime}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Date: </div>
                                {selectedExercise.date}
                            </div>
                        </div>
                    </div>
                }

                <Formik
                    initialValues={{
                        startTime: undefined,
                        endTime: undefined,
                        date: undefined
                    }}
                >

                    {({ errors, setFieldError, setFieldValue, values }) => {
                        return (
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    const response = await dispatch(updateExercise(values, exerciseId))
                                    if (response.status === 200) {
                                        history.push('/exercises');
                                    } else {
                                        if (response.hour) {
                                            setFieldError('startTime', response.hour);
                                        }

                                        if (response.date) {
                                            setFieldError('date', response.date);
                                        }
                                    }
                                }}
                            >
                                < div className="ui segment" >
                                    <div className="ui form">
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
                                                    minDate={new Date()}
                                                    className={errors.date ? "red-border" : ""}
                                                />
                                                <div
                                                    style={{ color: errors.date ? 'red' : '' }}>
                                                    {errors.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ div>
                                <CustomButton
                                    type="submit"
                                    className="ui black submit button"
                                    disabled={isAllFilled(values) ? true : false}
                                    value="Update" />
                            </Form>
                        )
                    }}
                </Formik>
            </div >
        );
    };

    return (
        <div>{renderUpdateExercise()}</div>
    );
};

export default UpdateExercise;