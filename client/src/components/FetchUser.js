import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserById } from '../actions/index';
import LoadingForm from './forms/LoadingForm';

const FetchUser = props => {
    const userId = props.match.params.id;
    const user = useSelector(state => state.selectedUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserById(userId));
    }, [dispatch, userId]);

    return (
        <div className="ui container">
            <br />
            {!user ?
                <LoadingForm /> :
                <div className="ui celled list">
                    <img
                        src={user.imageUrl}
                        alt=""
                        className="ui small image"
                    />
                    <div className="item">
                        <div className="content">
                            <div className="header">Firstname: </div>
                            {user.firstname}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Lastname: </div>
                            {user.lastname}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Kind: </div>
                            {user.kind}
                        </div>
                    </div>
                    <div className="item">
                        <div className="content">
                            <div className="header">Phone: </div>
                            {user.phone}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default FetchUser;