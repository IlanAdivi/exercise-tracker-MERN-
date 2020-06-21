import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { parseISO, format } from 'date-fns';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// import { Field, reduxForm } from 'redux-form';
import { createExercise } from '../actions/index';
import { isEmpty } from '../Services';
import CustomButton from './forms/CustomButton';
import CustomInput from './forms/CustomInput';

const CreateExercise = props => {
    const [exercise, setExercise] = useState({
        username: '',
        userId: 0,
        course: '',
        // grade: '',
        // messageTo: '',
        // description: '',
        // status: '',
        // completed: false,
        startTime: null,
        endTime: null,
        duration: '',
        date: null,
        users: []
    });

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(response => {
                if (response.data.users.length > 0) {
                    const userNamesAndIdsArray = response.data.users.map(user => {
                        return {
                            fullname: `${user.firstname} ${user.lastname}`,
                            _id: `${user._id}`
                        }
                    });

                    setExercise({
                        ...exercise,
                        username: `${response.data.users[0].firstname} ${response.data.users[0].lastname}`,
                        users: userNamesAndIdsArray,
                        userId: response.data.users[0]._id
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeUsername = e => {
        const SelectedExercise = exercise.users.find(exerciseItem => {
            if (exerciseItem.fullname === e.target.value) {
                return exerciseItem._id
            }
        });

        setExercise({
            ...exercise,
            username: e.target.value,
            userId: SelectedExercise._id
        });
    };

    const onChangeCourse = e => {
        setExercise({
            ...exercise,
            course: e.target.value
        });
    };

    // const onChangeGrade = e => {
    //     setExercise({
    //         ...exercise,
    //         grade: e.target.value
    //     });
    // };

    // const onChangeDescription = e => {
    //     setExercise({
    //         ...exercise,
    //         description: e.target.value
    //     });
    // };

    // const onChangeMessageTo = e => {
    //     setExercise({
    //         ...exercise,
    //         messageTo: e.target.value
    //     });
    // };

    // const onChangeStatus = e => {
    //     setExercise({
    //         ...exercise,
    //         status: e.target.value
    //     });
    // };

    // const onChangeCompleted = e => {
    //     setExercise({
    //         ...exercise,
    //         completed: e.target.value
    //     });
    // };

    const onChangeDuration = e => {
        setExercise({
            ...exercise,
            duration: e.target.value
        });
    };

    const onChangeDate = date => {
        // const dateFromInput = moment(date).toDate();
        setExercise({
            ...exercise,
            date
        });
    };

    const onChangeStartHour = hour => {
        console.log(hour);
        setExercise({
            ...exercise,
            startTime: hour
        });
    };

    const onChangeEndHour = hour => {
        setExercise({
            ...exercise,
            endTime: hour
        });
    };

    const onCreateExercise = async e => {
        e.preventDefault();
        await dispatch(createExercise(exercise));
        setExercise({
            username: '',
            userId: 0,
            course: '',
            grade: '',
            messageTo: '',
            description: '',
            status: '',
            completed: false,
            duration: '',
            startTime: null,
            endTime: null,
            date: null,
            users: []
        });
        props.history.replace('/exercises');
    };

    return (
        <div className="ui container">
            <br></br>
            <br></br>
            <h3>Create New Exercise Log</h3>
            < div className="ui segment" >
                <div className="ui form">
                    {/* <div className="five fields"> */}
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
                        <CustomInput
                            type="text"
                            placeholder="Course"
                            value={exercise.course}
                            onChange={e => onChangeCourse(e)}
                        />
                    </div>
                    <div className="field">
                        <label>Duration: </label>
                        <CustomInput
                            placeholder="In hours"
                            value={exercise.duration}
                            onChange={e => onChangeDuration(e)}
                        />
                    </div>
                    <div className="field">
                        <label>StartTime: </label>
                        <DatePicker
                            placeholderText="h:mm aa"
                            selected={exercise.startTime}
                            onChange={hour => onChangeStartHour(hour)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </div>
                    <div className="field">
                        <label>EndTime: </label>
                        <DatePicker
                            placeholderText="h:mm aa"
                            selected={exercise.endTime}
                            onChange={hour => onChangeEndHour(hour)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </div>
                    <div className="field">
                        <label>Date: </label>
                        <DatePicker
                            placeholderText="DD/MM/YYYY"
                            selected={exercise.date}
                            onChange={date => onChangeDate(date)}
                        />
                    </div>
                    {/* <div className="field">
                            <label>Grade: </label>
                            <input
                                placeholder="Grade"
                                value={exercise.grade}
                                onChange={e => onChangeGrade(e)}
                            />
                        </div> */}
                    {/* <div className="field">
                            <label>Status: </label>
                            <input
                                placeholder="Status"
                                value={exercise.status}
                                onChange={e => onChangeStatus(e)}
                            />
                        </div> */}
                    {/* <div className="field">
                            <label>Message To: </label>
                            <input
                                placeholder="Phone to send a message"
                                value={exercise.messageTo}
                                onChange={e => onChangeMessageTo(e)}
                            />
                        </div> */}
                    {/* <div className="field">
                            <label>Completed: </label>
                            <div
                                className="ui radio checkbox"
                                style={{ width: "50%", bottom: '-5px' }}>
                                <input
                                    type="radio"
                                    value="true"
                                    checked={exercise.completed === 'true'}
                                    onChange={e => onChangeCompleted(e)}
                                />
                                <label>True</label>
                            </div>
                            <div
                                className="ui radio checkbox"
                                style={{ width: "50%", bottom: '-5px' }}>
                                <input
                                    type="radio"
                                    value="false"
                                    checked={exercise.completed === 'false'}
                                    onChange={e => onChangeCompleted(e)}
                                />
                                <label>False</label>
                            </div>
                        </div> */}
                    {/* </div> */}
                    {/* <div className="one field">
                        <div className="field">
                            <label>Description: </label>
                            <textarea
                                placeholder="Type your feedback"
                                name="textarea"
                                value={exercise.description}
                                onChange={e => onChangeDescription(e)}
                            ></textarea>
                        </div>
                    </div> */}


                    <CustomButton
                        className="ui submit button"
                        disabled={isEmpty(exercise) ? true : false}
                        onClick={e => onCreateExercise(e)}
                        value="Create" />
                </div>
            </div>
        </div>
    );
};

export default CreateExercise;