import React, { useEffect, useState } from 'react';
import {
    useDispatch,
    useSelector
}
    from 'react-redux';
import {
    fetchUsers,
    createUser,
    deleteUser
}
    from '../actions/index';

const Users = () => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        kind: '',
        phone: ''
    });

    const usersList = useSelector(state => {
        return state.users;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        setUser({
            firstname: '',
            lastname: '',
            kind: '',
            phone: ''
        });
    }, [dispatch]);

    const OnCreateUser = async e => {
        e.preventDefault();
        await dispatch(createUser(user));
        setUser({
            firstname: '',
            lastname: '',
            kind: '',
            phone: ''
        });
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

    const onDeleteUser = async (userId, e) => {
        e.preventDefault();
        await dispatch(deleteUser(userId));
    };

    const onUpdateUser = (userId, e) => {
        e.preventDefault();
        window.location = `users/${userId}`;
    };

    const isEmptyUser = user => {
        let countOfEmptyUserProperties = 0;

        Object.keys(user).map(userPropeties => {
            if (user[userPropeties] === '' ||
                user[userPropeties] === null ||
                user[userPropeties] === undefined) {
                countOfEmptyUserProperties++;
            }
            return countOfEmptyUserProperties;
        });

        return countOfEmptyUserProperties > 0 ? true : false;
    };

    return (
        <div className="ui container">
            <br></br>
            {usersList.length === 0 ?
                <div className="ui segment">
                    <p></p>
                    <div className="ui active inverted dimmer">
                        <div className="ui loader"></div>
                    </div>
                </div> :

                <table
                    className="ui selectable inverted celled table">
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Kind</th>
                            <th>Phone</th>
                            <th>UpdateAction</th>
                            <th>DeleteAction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map((user, index) =>
                            <tr key={index}>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.kind}</td>
                                <td>{user.phone}</td>
                                <td className="selectable">
                                    <a
                                        onClick={e => onUpdateUser(user._id, e)}
                                        href={`/${user._id}`}>Update</a>
                                </td>
                                <td className="selectable">
                                    <a
                                        href=""
                                        onClick={e => onDeleteUser(user._id, e)}>Delete</a>
                                </td>
                            </tr>)}

                    </tbody>
                </table>}

            < div className="ui inverted segment" >
                <div className="ui inverted form">
                    <div className="four fields">
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

                    <button
                        className="ui submit button"
                        disabled={isEmptyUser(user) ? true : false}
                        onClick={e => OnCreateUser(e)}>Create</button>
                </div>
            </div>
        </div >
    );
};

export default Users;