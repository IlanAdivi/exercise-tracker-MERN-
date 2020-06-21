import React from 'react';

const UsersForm = props => {
    console.log(props);
    return (
        <div>
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
                                        src={`${user.imageUrl}`}
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
            <button
                className="ui submit button"
                onClick={e => onCreateUser(e)}
            >Create</button>
        </div >
    );
};

export default UsersForm;