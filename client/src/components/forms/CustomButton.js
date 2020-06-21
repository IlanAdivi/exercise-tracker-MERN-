import React from 'react';

const CustomButton = props => {
    return (
        <div>
            <button
            type={props.type}
                className={props.className}
                disabled={props.disabled}
                onClick={props.onClick}
            >{props.value}</button>
        </div>
    );
};

export default CustomButton;