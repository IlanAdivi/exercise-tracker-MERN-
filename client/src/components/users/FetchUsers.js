import React, {
    useEffect,
    useState
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
    from '../../actions/index';
import LoadingForm from '../forms/LoadingForm';
import CustomButton from '../forms/CustomButton';
import { useHistory } from 'react-router-dom';

const FetchUsers = () => {
    const [loading, setLoading] = useState(true);
    const usersList = useSelector(state => {
        return state.users.users;
    });
    // , message

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(
        () => {
            async function loadingFetchUsersFromBackend() {
                const response = await dispatch(fetchUsers());
                if (response.status === 200) {
                    setLoading(false);
                }
            }
            loadingFetchUsersFromBackend();
        }, [dispatch]);

    const onDeleteUser = async (userId, e) => {
        e.preventDefault();
        await dispatch(deleteUser(userId));
    };

    const onUpdateUser = (userId, e) => {
        e.preventDefault();
        history.push(`user/update/${userId}`);
    };

    const onFetchUser = (userId, e) => {
        e.preventDefault();
        history.push(`/user/fetch/${userId}`);
    };

    const onCreateUser = () => {
        history.push(`/user/add`);
    };

    const renderFetchUsers = () => {
        return (
            <div className="ui container">
                <br></br>
                <br></br>
                {loading === true ?
                    <LoadingForm />
                    :
                    (usersList.hasOwnProperty('undefined') ||
                        Object.keys(usersList).length === 0)
                        &&
                        loading === false ?
                        <h3>There are no users Yet</h3>
                        :
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
                                {
                                    Object.keys(usersList).map(user => {

                                        return <tr key={user} >
                                            < td style={{
                                                paddingLeft: '15px',
                                                width: '5%',
                                                textAlign: 'center'
                                            }}>
                                                <a
                                                    className="ui avatar image"
                                                    onClick={e => onFetchUser(usersList[user]._id, e)}
                                                    href="!#"
                                                >
                                                    <img
                                                        src={usersList[user].imageUrl}
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
                                                    onClick={e => onFetchUser(usersList[user]._id, e)}>
                                                    {usersList[user].firstname}
                                                </a>
                                            </td>
                                            <td
                                                className="selectable"
                                                style={{
                                                    textAlign: "center"
                                                }}>
                                                <a
                                                    href="!#"
                                                    onClick={e => onFetchUser(usersList[user]._id, e)}>
                                                    {usersList[user].lastname}
                                                </a>
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: "center"
                                                }}>{usersList[user].kind}</td>
                                            <td
                                                className="selectable"
                                                style={{
                                                    textAlign: "center"
                                                }}>
                                                <a
                                                    href="!#"
                                                    onClick={e => onFetchUser(usersList[user]._id, e)}>
                                                    {usersList[user].phone.slice(0, 3)}
                                                    -
                                                    {usersList[user].phone.slice(3, 11)}
                                                </a>
                                            </td>
                                            <td
                                                className="selectable"
                                                style={{
                                                    textAlign: "center"
                                                }}>
                                                <a
                                                    onClick={e => onUpdateUser(usersList[user]._id, e)}
                                                    href="!#">Update</a>
                                            </td>
                                            <td
                                                className="selectable"
                                                style={{
                                                    textAlign: "center"
                                                }}>
                                                <a
                                                    href="!#"
                                                    onClick={e => onDeleteUser(usersList[user]._id, e)}>Delete</a>
                                            </td>
                                        </tr>
                                    })}
                            </tbody>
                        </table >}

                <br></br>
                <CustomButton
                    className="ui submit black button"
                    onClick={e => onCreateUser(e)}
                    value="Create"
                />
            </div >
        );
    };

    return (
        <div>{renderFetchUsers()}</div>
    );
};

export default FetchUsers;