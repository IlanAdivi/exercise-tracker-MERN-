import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { createUser } from '../actions/index';
import { isEmpty } from '../Services';

import CustomButton from './forms/CustomButton';
import CustomInput from './forms/CustomInput';

const CreateUser = props => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        kind: '',
        phone: '',
        selectedImage: null
    });

    const dispatch = useDispatch();

    // const onUploadProgress = progressEvent => {
    //     console.log(progressEvent);
    //     setUploadPercentage(parseInt
    //         (Math.round((progressEvent.loaded * 100 /
    //             progressEvent.total)
    //         )));
    // };

    const OnCreateUser = async e => {
        e.preventDefault();

        const image = new FormData(e.target);
        image.set('firstname', user.firstname);
        image.set('lastname', user.lastname);
        image.set('kind', user.kind);
        image.set('phone', user.phone);
        image.append("image", user.selectedImage);

        await dispatch(createUser(user, image));
        setUser({
            firstname: '',
            lastname: '',
            kind: '',
            phone: '',
            selectedImage: null
        });

        props.history.replace('/');
    };

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

    const onChangeSelectedFile = e => {
        e.preventDefault();

        setUser({ 
            ...user,
            selectedImage: e.target.files[0]
        });
    };

    return (
        <div className="ui container">
            <br></br>
            <br></br>
            <h3>Create New User</h3>
            <form
                onSubmit={e => OnCreateUser(e)}>
                < div className="ui segment" >
                    <div className="ui form">
                        <div className="field">
                            <label>First Name</label>
                            <CustomInput
                                placeholder="First Name"
                                type="text"
                                value={user.firstname}
                                onChange={e => onChangeFirstName(e)} />
                        </div>
                        <div className="field">
                            <label>Last Name</label>
                            <CustomInput
                                placeholder="Last Name"
                                type="text"
                                value={user.lastname}
                                onChange={e => onChangeLastName(e)} />
                        </div>
                        <div className="field">
                            <label>Kind</label>
                            <CustomInput
                                placeholder="Kind"
                                type="text"
                                value={user.kind}
                                onChange={e => onChangeKind(e)} />
                        </div>
                        <div className="field">
                            <label>Phone</label>
                            <CustomInput
                                placeholder="Phone"
                                type="text"
                                value={user.phone}
                                onChange={e => onChangePhone(e)} />
                        </div>
                        <div className="field">
                            <label>Image</label>
                            <CustomInput
                                type="file"
                                name=""
                                id=""
                                encType="multipart/form-data"
                                onChange={e => onChangeSelectedFile(e)}
                            />
                        </div>

                        <CustomButton 
                            type="submit"
                            className="ui submit button"
                            disabled={isEmpty(user) ? true : false}
                            value="Create"
                        />
                    </div>
                </div>
            </form>
        </div >
    );
};

export default CreateUser;