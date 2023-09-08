import React from 'react';


export const MustPickDayForm = ({ id, hideModal }) => {

    const handleSubmit = () => {
        hideModal();
    };

    return (
        <div>
            <div>You must pick days</div>
            <button onClick={handleSubmit}>Check availability</button>
        </div >

    );
};
