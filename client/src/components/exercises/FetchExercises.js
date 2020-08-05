import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchExercises, deleteExercise, fetchUsers } from '../../actions';

import LoadingForm from '../forms/LoadingForm';
import CustomButton from '../forms/CustomButton';

const FetchExercises = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const exercisesList = useSelector(state => {
        console.log(state.exercises.exercises)
        return state.exercises.exercises
    });
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(
        () => {
            async function loadingFetchUsersFromBackend() {
                await dispatch(fetchExercises());
                const response = await dispatch(fetchUsers());

                if (response.status === 200) {
                    setUsers(response.data.users);
                    setLoading(false);
                }
            }
            loadingFetchUsersFromBackend();
        }, [dispatch]);

    const onCreateExercise = () => {
        history.push(`/exercise/add`);
    };

    const onDeleteExercise = async (exerciseId, e) => {
        e.preventDefault();
        await dispatch(deleteExercise(exerciseId));
    };

    const onUpdateExercise = (exerciseId, e) => {
        e.preventDefault();
        history.push(`exercise/update/${exerciseId}`);
    };

    const onFetchExercise = (exerciseId, e) => {
        e.preventDefault();
        history.push(`exercise/fetch/${exerciseId}`);
    };

    const renderFetchExercises = () => {
        return (
            <div className="ui container">
                <br></br>
                <br></br>
                {loading === true ?
                    <LoadingForm />
                    :
                    (exercisesList.hasOwnProperty('undefined') ||
                        Object.keys(exercisesList).length === 0)
                        &&
                        loading === false ?
                        <h3>There are no Exercises yet</h3>
                        :
                        <table className="ui selectable inverted celled table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th
                                        style={{
                                            textAlign: "center",
                                            width: '12%'
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
                                {Object.keys(exercisesList).map((exercise, index) =>
                                    <tr key={index}>
                                        <td style={{
                                            paddingLeft: '15px',
                                            width: '5%',
                                            textAlign: 'center'
                                        }}>
                                            <a
                                                className="ui avatar image"
                                                onClick={e => onFetchExercise(exercisesList[exercise]._id, e)}
                                                href="!#"
                                            >
                                                <img
                                                    src={`${exercisesList[exercise].user.imageUrl}`}
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
                                                onClick={e => onFetchExercise(exercisesList[exercise]._id, e)}>
                                                {exercisesList[exercise].user.firstname}
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
                                                onClick={e => onFetchExercise(exercisesList[exercise]._id, e)}>
                                                {exercisesList[exercise].user.lastname}
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
                                                onClick={e => onFetchExercise(exercisesList[exercise]._id, e)}>
                                                {exercisesList[exercise].course}
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
                                                onClick={e => onFetchExercise(exercisesList[exercise]._id, e)}>
                                                {exercisesList[exercise].startTime}
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
                                                onClick={e => onFetchExercise(exercisesList[exercise]._id, e)}>
                                                {exercisesList[exercise].endTime}
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
                                                onClick={e => onFetchExercise(exercisesList[exercise]._id, e)}>
                                                {exercisesList[exercise].date}
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
                                                onClick={e => onUpdateExercise(exercisesList[exercise]._id, e)}>
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
                                                onClick={e => onDeleteExercise(exercisesList[exercise]._id, e)}>
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
                    className="ui submit black button"
                    disabled={users.length === 0 ? true :
                        false}
                    onClick={e => onCreateExercise(e)}
                    value="Create"
                />
            </div>
        );
    };

    return (
        <div>{renderFetchExercises()}</div>
    );
};

export default FetchExercises;