import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBookingThunk } from '../../store/bookings';
import './DeleteBookingForm.css';

export const DeleteBookingForm = ({ id, hideModal, totalBookings }) => {
    const dispatch = useDispatch();

    const handleDelete = async e => {
        e.preventDefault();
        await dispatch(deleteBookingThunk(id)).then(
            () => {
                hideModal();
                totalBookings = totalBookings - 1;
            });
    };

    return (
        <div className='deleteWrapper'>
            <div className='question'>Are you sure you want to cancel this booking?</div>
            <button className='btn' onClick={handleDelete}>Confirm cancellation</button>
        </div >
    );
};
