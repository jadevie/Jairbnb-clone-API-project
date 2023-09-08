import React from 'react';
import { useDispatch } from 'react-redux';
import { getAllBookingsBySpotThunk } from '../../store/spots';


export const MustPickDayForm = ({ id, hideModal }) => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(getAllBookingsBySpotThunk(id));
        hideModal();
    };

    return (
        <div>
            <div>You must pick days</div>
            <button onClick={handleSubmit}>Check availability</button>
        </div >

    );
};
