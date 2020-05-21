import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createExercise } from '../actions/index';

const CreateExercise = () => {
    const [exercise, setExercise] = useState({
        username: '',
        userId: 0,
        course: '',
        grade: '',
        description: '',
        status: '',
        completed: false,
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

    const onChangeGrade = e => {
        setExercise({
            ...exercise,
            grade: e.target.value
        });
    };

    const onChangeDescription = e => {
        setExercise({
            ...exercise,
            description: e.target.value
        });
    };

    const onChangeStatus = e => {
        setExercise({
            ...exercise,
            status: e.target.value
        });
    };

    const onChangeCompleted = e => {
        setExercise({
            ...exercise,
            completed: e.target.value
        });
    };

    const onChangeDuration = e => {
        setExercise({
            ...exercise,
            duration: e.target.value
        });
    };

    const onChangeDate = date => {
        setExercise({
            ...exercise,
            date
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
            description: '',
            status: '',
            completed: false,
            duration: '',
            date: null,
            users: []
        });
        window.location = '/exercises';
    };

    const isEmptyExercise = exercise => {
        let countOfEmptyExerciseProperties = 0;

        Object.keys(exercise).map(exercisePropeties => {
            if (exercise[exercisePropeties] === '' ||
                exercise[exercisePropeties] === null ||
                exercise[exercisePropeties] === undefined) {
                countOfEmptyExerciseProperties++;
            }
        });

        ////Since the following properties: username and completed aren't empty
        return countOfEmptyExerciseProperties > 0 ? true : false;
    };

    return (
        <div className="ui container">
            <br></br>
            <br></br>
            <h3>Create New Exercise Log</h3>
            <div className="ui inverted segment">
                <div className="ui inverted form">
                    <div className="four fields">
                        <div className="field">
                            <label>Username: </label>
                            <select
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
                            <input
                                type="text"
                                placeholder="Course"
                                value={exercise.course}
                                onChange={e => onChangeCourse(e)}
                            />
                        </div>
                        <div className="field">
                            <label>Grade: </label>
                            <input
                                placeholder="Grade"
                                value={exercise.grade}
                                onChange={e => onChangeGrade(e)}
                            />
                        </div>
                        <div className="field">
                            <label>Description: </label>
                            <input
                                placeholder="Description"
                                value={exercise.description}
                                onChange={e => onChangeDescription(e)}
                            />
                        </div>
                    </div>
                    <div className="four fields">
                        <div className="field">
                            <label>Status: </label>
                            <input
                                placeholder="Status"
                                value={exercise.status}
                                onChange={e => onChangeStatus(e)}
                            />
                        </div>
                        <div className="field">
                            <label>Duration: </label>
                            <input
                                placeholder="In hours"
                                value={exercise.duration}
                                onChange={e => onChangeDuration(e)}
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
                        <div className="field">
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
                        </div>
                    </div>
                    <button
                        className="ui submit button"
                        disabled={isEmptyExercise(exercise) ? true : false}
                        onClick={e => onCreateExercise(e)}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateExercise;