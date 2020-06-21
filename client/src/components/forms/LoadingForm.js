import React from 'react';

const LoadingForm = () => {
    return (
        <div className="ui segment">
            <p></p>
            <div className="ui active inverted dimmer">
                <div className="ui loader"></div>
            </div>
        </div>
    );
};

export default LoadingForm;