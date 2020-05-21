import React, {
    useState,
    useEffect
}
    from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateExercise,
    fetchExerciseById
}
    from '../actions';

const UpdateExercise = props => {
    const [exercise, setExercise] = useState({
        grade: '',
        description: '',
        status: '',
        duration: '',
        completed: ''
    });

    const selectedExercise = useSelector(state => state.selectedExercise);
    const dispatch = useDispatch();
    const exerciseId = props.match.params.id;

    useEffect(() => {
        dispatch(fetchExerciseById(exerciseId));
    }, [dispatch]);

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

    const onUpdateExercise = async (e, exercise) => {
        e.preventDefault();
        await dispatch(updateExercise(exercise, exerciseId));
        setExercise({
            grade: '',
            description: '',
            status: '',
            duration: '',
            completed: ''
        });
        window.location = '/exercises';
    };

    const isEmptyExercise = exercise => {
        let countOfEmptyExerciseProperties = 0;
        Object.keys(exercise).map(exerciseProperties => {
            if (exercise[exerciseProperties] === '' ||
                exercise[exerciseProperties] === null ||
                exercise[exerciseProperties] === undefined) {
                countOfEmptyExerciseProperties++;
            }
        });

        return countOfEmptyExerciseProperties === 0 ? false : true;
    };

    return (
        <div className="ui container">
            <br></br>
            <br></br>

            {!selectedExercise || selectedExercise.length === 0 ?
                <div className="ui segment">
                    <p></p>
                    <div className="ui active inverted dimmer">
                        <div className="ui loader"></div>
                    </div>
                </div> :
                <div className="ui celled list">
                    <div className="item">
                        <div className="content">
                            <div className="header">Firstname: </div>
                            {!selectedExercise.user ? '' : selectedExercise.user.firstname}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Lastname: </div>
                            {!selectedExercise.user ? '' :  selectedExercise.user.lastname}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Kind: </div>
                            {!selectedExercise.user ? '' :  selectedExercise.user.kind}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Phone: </div>
                            {!selectedExercise.user ? '' :  selectedExercise.user.phone}
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
                            <div className="header">Grade: </div>
                            {selectedExercise.grade}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Description: </div>
                            {selectedExercise.description}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Status: </div>
                            {selectedExercise.status}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Duration(Hours): </div>
                            {selectedExercise.duration}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Completed: </div>
                            {JSON.stringify(selectedExercise.completed)}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Date: </div>
                            {!selectedExercise.date ? '' : selectedExercise.date.slice(0, 10)}
                        </div>
                    </div>
                </div>
            }


            < div className="ui inverted segment" >
                <div className="ui inverted form">
                    <div className="five fields">
                        <div className="field">
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
                        </div>
                        <div className="field">
                            <label>Duration: </label>
                            <input
                                placeholder="Duration"
                                value={exercise.duration}
                                onChange={e => onChangeDuration(e)} />
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
                </div>
            </ div>
            <button
                className="ui submit button"
                disabled={isEmptyExercise(exercise) ? true : false}
                onClick={e => onUpdateExercise(e, exercise)}>
                Update
            </button>
        </div>
    );
};

export default UpdateExercise;