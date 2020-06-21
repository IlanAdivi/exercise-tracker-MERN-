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
import LoadingForm from './forms/LoadingForm';
import CustomButton from './forms/CustomButton';

const FetchExercises = props => {
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
        props.history.replace(`/exercise/add`);
    };

    const onDeleteExercise = async (exerciseId, e) => {
        e.preventDefault();
        await dispatch(deleteExercise(exerciseId));
    };

    const onUpdateExercise = (exerciseId, e) => {
        e.preventDefault();
        props.history.replace(`exercise/update/${exerciseId}`);
    };

    const onFetchExercise = (exerciseId, e) => {
        e.preventDefault();
        props.history.replace(`exercise/fetch/${exerciseId}`);
    };

    return (
        <div className="ui container">
            <br></br>
            <br></br>
            {!exercisesList || exercisesList.length === 0 ?
                <LoadingForm />
                :
                <table className="ui selectable inverted celled table">
                    <thead>
                        <tr>
                            <th></th>
                            <th
                                style={{
                                    textAlign: "center",
                                    width: '12%'
                                    // height: '0'
                                }}>Firstname</th>
                            <th
                                style={{
                                    textAlign: "center",
                                    width: '12%'
                                }}>
                                Lastname</th>
                            <th
                                style={{
                                    textAlign: "center",
                                    width: '17%'
                                }}>Course</th>
                            {/* <th>Grade</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Completed</th> */}
                            {/* <th
                                style={{
                                    textAlign: "center",
                                    width: '5%'
                                }}>Duration</th> */}
                            <th
                                style={{
                                    textAlign: "center",
                                    width: '7%'
                                }}>
                                Start
                                </th>
                            <th
                                style={{
                                    textAlign: "center",
                                    width: '7%'
                                }}>
                                End
                                </th>
                            <th
                                style={{
                                    textAlign: "center",
                                    width: '10%'
                                }}>
                                Date</th>
                            <th
                                colSpan="2"
                                style={{
                                    textAlign: "center",
                                    width: '32%'
                                }}>
                                Action
                                </th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercisesList.map((exercise, index) =>
                            <tr key={index}>
                                <td style={{
                                    paddingLeft: '15px',
                                    width: '5%',
                                    textAlign: 'center'
                                }}>
                                    <a
                                        className="ui avatar image"
                                        onClick={e => onFetchExercise(exercise._id, e)}
                                        href="!#"
                                    >
                                        <img
                                            src={`${exercise.user.imageUrl}`}
                                            alt=""
                                        />
                                    </a>
                                </td>
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center",
                                        width: '13%'
                                    }}>
                                    <a
                                        href="!#"
                                        onClick={e => onFetchExercise(exercise._id, e)}>
                                        {exercise.user.firstname}
                                    </a>
                                </td>
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center",
                                        width: '13%'
                                    }}>
                                    <a
                                        href="!#"
                                        onClick={e => onFetchExercise(exercise._id, e)}>
                                        {exercise.user.lastname}
                                    </a>
                                </td>
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center",
                                        width: '17%'
                                    }}>
                                    <a
                                        href="!#"
                                        onClick={e => onFetchExercise(exercise._id, e)}>
                                        {exercise.course}
                                    </a>
                                </td>
                                {/* <td
                                    style={{
                                        textAlign: "center"
                                    }}>{exercise.grade}</td>
                                <td>{exercise.description}</td>
                                <td>{exercise.status}</td>
                                <td>{exercise.completed.toString()}</td> */}
                                {/* <td
                                    className="selectable"
                                    style={{ textAlign: "center" }}
                                >
                                    <a
                                        href="!#"
                                        onClick={e => onFetchExercise(exercise._id, e)}>
                                        {exercise.duration}
                                    </a>
                                </td>                         */}
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center",
                                        width: '7%'
                                    }}>
                                    <a
                                        href="!#"
                                        onClick={e => onFetchExercise(exercise._id, e)}>
                                        {exercise.startTime}
                                    </a>
                                </td>
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center",
                                        width: '7%'
                                    }}>
                                    <a
                                        href="!#"
                                        onClick={e => onFetchExercise(exercise._id, e)}>
                                        {exercise.endTime}
                                    </a>
                                </td>
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center",
                                        width: '10%'
                                    }}
                                >
                                    <a
                                        href="!#"
                                        onClick={e => onFetchExercise(exercise._id, e)}>
                                        {exercise.date}
                                    </a>
                                </td>

                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center",
                                        width: '10%'
                                    }}>
                                    <a
                                        href="!#"
                                        onClick={e => onUpdateExercise(exercise._id, e)}>
                                        Update
                                    </a>
                                </td>
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center",
                                        width: '10%'
                                    }}>
                                    <a
                                        href="!#"
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
            <CustomButton
                className="ui submit button"
                disabled={users.length === 0 ? true :
                    false}
                onClick={e => onCreateExercise(e)}
                value="Create"
                />
            {/* // >Create</button> */}
        </div>

    );
};

export default FetchExercises;