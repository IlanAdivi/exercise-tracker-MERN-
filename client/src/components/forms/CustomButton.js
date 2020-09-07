import React from 'react';

const CustomButton = props => {
    return (
        <span>
            <button
                type={props.type}
                style={props.style}
                className={props.className}
                disabled={props.disabled}
                onClick={props.onClick}
            >{props.value}</button>
        </span>
    );
};

export default CustomButton;