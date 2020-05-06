import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser } from '../actions/index';

function Users() {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        kind: '',
        phone: ''
    });

    const users = useSelector(state => {
        console.log(state.usersData)
        return state.usersData;
    });
    console.log(typeof (users));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const OnCreateUser = () => {
        console.log(user);
        dispatch(createUser(user));
    }

    const onChangeFirstName = e => {
        setUser({ ...user, firstname: e.target.value });
    };

    const onChangeLastName = e => {
        setUser({ ...user, lastname: e.target.value });
    };

    const onChangeKind = e => {
        setUser({ ...user, kind: e.target.value });
    };

    const onChangePhone = e => {
        setUser({ ...user, phone: e.target.value });
    };

    if (users) {
        console.log(users);
    }

    return (
        <div className="ui container">
            <br></br>
            {!users ?
                <div>Loading...</div> :
                Object.keys(users).map((user, index) =>
                    <table
                        key={user}
                        className="ui selectable inverted celled table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user}</td>
                                <td>Denied</td>
                                <td className="selectable">
                                    <a href="#">Edit</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>)}

            < div className="ui inverted segment" >
                <div className="ui inverted form">
                    <div className="two fields">
                        <div className="field">
                            <label>First Name</label>
                            <input
                                placeholder="First Name"
                                type="text"
                                value={user.firstname}
                                onChange={e => onChangeFirstName(e)} />
                        </div>
                        <div className="field">
                            <label>Last Name</label>
                            <input
                                placeholder="Last Name"
                                type="text"
                                value={user.lastname}
                                onChange={e => onChangeLastName(e)} />
                        </div>
                        <div className="field">
                            <label>Kind</label>
                            <input
                                placeholder="Kind"
                                type="text"
                                value={user.kind}
                                onChange={e => onChangeKind(e)} />
                        </div>
                        <div className="field">
                            <label>Phone</label>
                            <input
                                placeholder="Phone"
                                type="text"
                                value={user.phone}
                                onChange={e => onChangePhone(e)} />
                        </div>
                    </div>

                    <div
                        className="ui submit button"
                        onClick={() => OnCreateUser()}>Create</div>
                </div>
            </div>
        </div >
    );
};

export default Users;