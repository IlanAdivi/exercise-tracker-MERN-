import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserById } from '../../actions/index';
import LoadingForm from '../forms/LoadingForm';

const FetchUser = props => {
    const userId = props.match.params.id;
    const selectedUser = useSelector(state => {
        return state.users.selectedUser;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserById(userId));
    }, [dispatch, userId]);

    const renderFetchExercise = () => {
        return (
            <div className="ui container">
                <br />
                {!selectedUser ?
                    <LoadingForm /> :
                    <div
                        className="ui celled list"
                        key={userId}>
                        <img
                            src={selectedUser.imageUrl}
                            alt=""
                            className="ui small image"
                        />
                        <div className="item">
                            <div className="content">
                                <div className="header">Firstname: </div>
                                {selectedUser.firstname}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Lastname: </div>
                                {selectedUser.lastname}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Kind: </div>
                                {selectedUser.kind}
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Phone: </div>
                                {selectedUser.phone.slice(0, 3)}-{selectedUser.phone.slice(3, 11)}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    };

    return (
        <div>
            {renderFetchExercise()}
        </div>
    );
};

export default FetchUser;