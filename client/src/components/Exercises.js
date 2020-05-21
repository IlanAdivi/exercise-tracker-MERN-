import React, { useEffect, useState } from 'react';
import {
    useDispatch,
    useSelector
}
    from 'react-redux';

import {
    fetchExercises,
    deleteExercise
}
    from '../actions';
import axios from 'axios';

const Exercises = () => {
    const [users, setUsers] = useState([]);
    const exercisesList = useSelector(state => state.exercises);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExercises());
        axios.get(`http://localhost:5000/users`)
            .then(response => {
                if (response.data.users.length > 0) {
                    setUsers(response.data.users);
                }
            })
            .catch(error => {
                console.log(error)
            });
    }, [dispatch]);

    const onCreateExercise = () => {
        window.location = `/exercise/add`;
    };

    const onDeleteExercise = async (exerciseId, e) => {
        e.preventDefault();
        await dispatch(deleteExercise(exerciseId));
    };

    const onUpdateExercise = (exerciseId, e) => {
        e.preventDefault();
        window.location = `exercises/${exerciseId}`;
    };

    return (
        <div className="ui container">
            <br></br>
            <br></br>
            {!exercisesList || exercisesList.length === 0 ?
                <div className="ui segment">
                    <p></p>
                    <div className="ui active inverted dimmer">
                        <div className="ui loader"></div>
                    </div>
                </div>
                :
                <table className="ui selectable inverted celled table">
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Course</th>
                            <th>Grade</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Completed</th>
                            <th>Duration-Hours</th>
                            <th>Date</th>
                            <th>UpdateAction</th>
                            <th>DeleteAction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercisesList.map((exercise, index) =>
                            <tr key={index}>
                                <td>{exercise.user.firstname}</td>
                                <td>{exercise.user.lastname}</td>
                                <td>{exercise.course}</td>
                                <td>{exercise.grade}</td>
                                <td>{exercise.description}</td>
                                <td>{exercise.status}</td>
                                <td>{exercise.completed.toString()}</td>
                                <td>{exercise.duration}</td>
                                <td>{exercise.date.slice(0, 10)}</td>

                                <td className="selectable">
                                    <a
                                        href=""
                                        onClick={e => onUpdateExercise(exercise._id, e)}>
                                        Update
                                    </a>
                                </td>
                                <td className="selectable">
                                    <a
                                        href=""
                                        onClick={e => onDeleteExercise(exercise._id, e)}>
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
            <br></br>
            <button
                className="ui submit button"
                disabled={users.length === 0 ? true :
                    false}
                onClick={e => onCreateExercise(e)}
            >Create</button>
        </div>

    );
};

export default Exercises;