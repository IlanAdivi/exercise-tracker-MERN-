import React from 'react';

const CustomInput = props => {
    console.log(props);
    return (
        <div>
            <input
            className={props.className}
            type={props.type}
            placeholder={props.placeholder}
            id={props.id}
            encType={props.encType}
            value={props.value}
            onChange={props.onChange}
            />
        </div>
    );
};

export default CustomInput;