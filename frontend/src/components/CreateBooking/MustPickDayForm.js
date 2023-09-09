import React from 'react';


export const MustPickDayForm = ({ hideModal }) => {

    const handleSubmit = () => {
        hideModal();
    };

    return (
        <div>
            <div>Unavailable to check-in. Please choose different dates</div>
            <button onClick={handleSubmit}>Check availability</button>
        </div >

    );
};
