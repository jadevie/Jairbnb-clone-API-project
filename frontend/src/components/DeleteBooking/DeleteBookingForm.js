import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBookingThunk } from '../../store/bookings';
// import { useHistory } from 'react-router-dom';

export const DeleteBookingForm = ({ id, hideModal, totalBookings, setTotalBooking }) => {
    const dispatch = useDispatch();
    // const history = useHistory();

    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteBookingThunk(id)).then(
            () => {
                hideModal();
                setTotalBooking(totalBookings - 1);
                // history.push('/trips');
            });
    };

    return (
        <div>
            <div>Are you sure you want to cancel this booking?</div>
            <button onClick={handleDelete}>Confirm cancellation</button>
        </div>
    );
};
