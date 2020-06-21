import React, {
    useEffect
} from 'react';
import {
    useDispatch,
    useSelector
}
    from 'react-redux';
import {
    fetchUsers,
    deleteUser
}
    from '../actions/index';
import LoadingForm from './forms/LoadingForm';
import CustomButton from './forms/CustomButton';

const FetchUsers = props => {
    const usersList = useSelector(state => {
        return state.users;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const onDeleteUser = async (userId, e) => {
        e.preventDefault();
        await dispatch(deleteUser(userId));
    };

    const onUpdateUser = (userId, e) => {
        e.preventDefault();
        props.history.replace(`user/update/${userId}`);
    };

    const onFetchUser = (userId, e) => {
        e.preventDefault();
        props.history.replace(`/user/fetch/${userId}`);
    };

    const onCreateUser = () => {
        props.history.replace(`/user/add`);
    };

    return (
        <div className="ui container">
            <br></br>
            <br></br>
            {usersList.length === 0 ?
                <LoadingForm /> :

                <table
                    className="ui selectable inverted celled table">
                    <thead>
                        <tr>
                            <th></th>
                            <th
                                style={{
                                    textAlign: "center",
                                    width: '13%'
                                }}>Firstname</th>
                            <th
                                style={{
                                    textAlign: "center",
                                    width: '13%'
                                }}>Lastname</th>
                            <th
                                style={{
                                    textAlign: "center",
                                    width: '13%'
                                }}>Kind</th>
                            <th
                                style={{
                                    textAlign: "center",
                                    width: '17%'
                                }}>Phone</th>
                            <th
                                colSpan="2"
                                style={{
                                    textAlign: "center"
                                }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map((user, index) =>
                            <tr key={index}>
                                <td style={{
                                    paddingLeft: '15px',
                                    width: '5%',
                                    textAlign: 'center'
                                }}>
                                    <a
                                        className="ui avatar image"
                                        onClick={e => onFetchUser(user._id, e)}
                                        href="!#"
                                    >
                                        <img
                                            src={user.imageUrl}
                                            alt=""
                                        />
                                    </a>
                                </td>
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center"
                                    }}>
                                    <a
                                        href="!#"
                                        onClick={e => onFetchUser(user._id, e)}>
                                        {user.firstname}
                                    </a>
                                </td>
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center"
                                    }}>
                                    <a
                                        href="!#"
                                        onClick={e => onFetchUser(user._id, e)}>
                                        {user.lastname}
                                    </a>
                                </td>
                                <td
                                    style={{
                                        textAlign: "center"
                                    }}>{user.kind}</td>
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center"
                                    }}>
                                    <a
                                        href="!#"
                                        onClick={e => onFetchUser(user._id, e)}>
                                        {user.phone}
                                    </a>
                                </td>
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center"
                                    }}>
                                    <a
                                        onClick={e => onUpdateUser(user._id, e)}
                                        href="!#">Update</a>
                                </td>
                                <td
                                    className="selectable"
                                    style={{
                                        textAlign: "center"
                                    }}>
                                    <a
                                        href="!#"
                                        onClick={e => onDeleteUser(user._id, e)}>Delete</a>
                                </td>
                            </tr>)}

                    </tbody>
                </table>}

            <br></br>
            <CustomButton
                className="ui submit button"
                onClick={e => onCreateUser(e)}
                value="Create"
                />
            {/* // >Create</button> */}
        </div >
    );
};

export default FetchUsers;