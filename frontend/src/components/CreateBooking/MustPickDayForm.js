import React from 'react';


export const MustPickDayForm = ({ hideModal }) => {

    const handleSubmit = () => {
        hideModal();
    };

    return (
        <div className='UnavailableWrapper'>
            <div className='question'>Unavailable to check-in. Please choose different dates
            </div>
            <button className='btn' onClick={handleSubmit}>Check availability</button>
        </div >

    );
};
