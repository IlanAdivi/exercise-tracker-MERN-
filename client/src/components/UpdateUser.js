import React, {
    useEffect,
    useState
}
    from 'react';

import {
    useDispatch,
    useSelector
}
    from 'react-redux';

import {
    updateUser,
    fetchUserById
}
    from '../actions/index';
import LoadingForm from './forms/LoadingForm';
import CustomButton from './forms/CustomButton';
import CustomInput from './forms/CustomInput';

const UpdateUser = props => {
    const [phone, setPhone] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state.selectedUser);
    const userId = props.match.params.id;

    useEffect(() => {
        dispatch(fetchUserById(userId));
        setPhone('');
    }, [dispatch, userId]);

    const onChangePhone = e => {
        setPhone(e.target.value);
    };

    const OnUpdateUser = async e => {
        e.preventDefault();
        await dispatch(updateUser(userId, phone));
        setPhone('');
        props.history.replace('/users');
    };

    return (
        <div className="ui container">
            <br />
            {!user || user.length === 0 ?
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

            < div className="ui segment" >
                <div className="ui form">
                    <div className="field">
                        <label>Phone</label>
                        <CustomInput
                            placeholder="Phone"
                            type="text"
                            value={phone}
                            onChange={e => onChangePhone(e)} />
                    </div>
                </ div>
            </div>
            <CustomButton
                className="ui submit button"
                disabled={!phone ? true : false}
                onClick={e => OnUpdateUser(e)}
                value="Update" />
        </div>
    );
};

export default UpdateUser;