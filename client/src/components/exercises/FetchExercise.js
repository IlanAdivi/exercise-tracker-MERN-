import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchExerciseById } from '../../actions/index';
import LoadingForm from '../forms/LoadingForm';

const FetchExercise = props => {
    const exerciseId = props.match.params.id;
    const selectedExercise = useSelector(state => {
        console.log(state.exercises.selectedExercise);
        return state.exercises.selectedExercise
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExerciseById(exerciseId));
    }, [dispatch, exerciseId]);

    const renderFetchExercise = () => {
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
                                {!selectedExercise.user ? '' :
                                    `${selectedExercise.user.phone.slice(0, 3)}-${selectedExercise.user.phone.slice(3, 11)}`}
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
                                {!selectedExercise.startTime ? '' : selectedExercise.startTime}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">End Time: </div>
                                {!selectedExercise.endTime ? '' : selectedExercise.endTime}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Date: </div>
                                {!selectedExercise.date ? '' : selectedExercise.date}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    };

    return (
        <div>{renderFetchExercise()}</div>
    );
};

export default FetchExercise;