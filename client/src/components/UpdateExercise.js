import React, {
    useState,
    useEffect
}
    from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import {
    updateExercise,
    fetchExerciseById
}
    from '../actions';

import { isEmpty } from '../Services';
import LoadingForm from './forms/LoadingForm';
import CustomInput from './forms/CustomInput';
import CustomButton from './forms/CustomButton';

const UpdateExercise = props => {
    const [exercise, setExercise] = useState({
        // grade: '',
        // description: '',
        // status: '',
        duration: '',
        startTime: null,
        endTime: null,
        date: null
        // completed: ''
    });

    const selectedExercise = useSelector(state => state.selectedExercise);
    const dispatch = useDispatch();
    const exerciseId = props.match.params.id;

    useEffect(() => {
        dispatch(fetchExerciseById(exerciseId));
    }, [dispatch, exerciseId]);

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

    const onChangeStartHour = hour => {
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

    const onChangeDate = date => {
        setExercise({
            ...exercise,
            date
        });
    };

    const onUpdateExercise = async (e, exercise) => {
        e.preventDefault();
        await dispatch(updateExercise(exercise, exerciseId));
        setExercise({
            // grade: '',
            // description: '',
            // status: '',
            duration: '',
            startTime: null,
            endTime: null,
            date: null
            // completed: ''
        });
        props.history.replace('/exercises');
    };

    return (
        <div className="ui container">
            <br></br>
            <br></br>

            {!selectedExercise || selectedExercise.length === 0 ?
                <LoadingForm /> :
                <div className="ui celled list">
                    <img
                        src={!selectedExercise.user ? '' : selectedExercise.user.imageUrl}
                        alt=""
                        className="ui small image"
                    />
                    <div className="item">
                        <div className="content">
                            <div className="header">Firstname: </div>
                            {!selectedExercise.user ? '' : selectedExercise.user.firstname}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Lastname: </div>
                            {!selectedExercise.user ? '' : selectedExercise.user.lastname}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Kind: </div>
                            {!selectedExercise.user ? '' : selectedExercise.user.kind}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Phone: </div>
                            {!selectedExercise.user ? '' : selectedExercise.user.phone}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Course: </div>
                            {selectedExercise.course}
                        </div>
                    </div>
                    {/* <div className="item">
                        <div className="content">
                            <div className="header">Grade: </div>
                            {selectedExercise.grade}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Description: </div>
                            {selectedExercise.description}
                        </div>
                    </div> */}
                    {/* <div className="item">
                        <div className="content">
                            <div className="header">Status: </div>
                            {selectedExercise.status}
                        </div>
                    </div> */}
                    <div className="item">
                        <div className="content">
                            <div className="header">Duration(Hours): </div>
                            {selectedExercise.duration}
                        </div>
                    </div>
                    {/* <div className="item">
                        <div className="content">
                            <div className="header">Completed: </div>
                            {JSON.stringify(selectedExercise.completed)}
                        </div>
                    </div> */}
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


            < div className="ui segment" >
                <div className="ui form">
                    <div className="two fields">
                        {/* <div className="field">
                            <label>Grade: </label>
                            <input
                                placeholder="Grade"
                                value={exercise.grade}
                                onChange={e => onChangeGrade(e)} />
                        </div>
                        <div className="field">
                            <label>Description: </label>
                            <input
                                placeholder="Description"
                                value={exercise.description}
                                onChange={e => onChangeDescription(e)} />
                        </div>
                        <div className="field">
                            <label>Status: </label>
                            <input
                                placeholder="Status"
                                value={exercise.status}
                                onChange={e => onChangeStatus(e)} />
                        </div> */}
                        <div className="field">
                            <label>Duration: </label>
                            <CustomInput
                                placeholder="Duration"
                                value={exercise.duration}
                                onChange={e => onChangeDuration(e)} />
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
                    </div>
                </div>
            </ div>
            <CustomButton
                className="ui submit button"
                disabled={isEmpty(exercise) ? true : false}
                onClick={e => onUpdateExercise(e, exercise)}
                value="Update" />
        </div>
    );
};

export default UpdateExercise;