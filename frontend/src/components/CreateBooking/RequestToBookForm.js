import React from 'react';
import './CreateBooking.css';
import { useDispatch } from 'react-redux';
import { createBookingThunk } from '../../store/spots';
import { useHistory, useParams } from 'react-router-dom';
import './RequestToBook.css';
export const RequestToBookForm = ({ user, hideModal, start,
    end,
    price,
    totalPrice,
    cleaningFee,
    serviceFee,
    totalDays }) => {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();

    const handleBooking = async e => {
        e.preventDefault();
        const booking = {
            startDate: start,
            endDate: end
        };
        if (user) {
            await dispatch(createBookingThunk(spotId, booking)).then(() => {
                hideModal();
                history.push('/trips');
            });
        }
    };

    return (
        <div className='requestToBookWrapper'>
            <div className='priceInfo'>Price Details</div>
            <div className='detailPrice'>
                <div className='paymentBreakdown'>{price} x {totalDays ? totalDays : 1} nights</div>
                <div>${totalPrice}</div>
            </div>
            <div className='detailPrice'>
                <div className='paymentBreakdown'>Cleaning fee</div>
                <div>${cleaningFee}</div>
            </div>
            <div className='detailPrice'>
                <div className='paymentBreakdown'>Jairbnb service fee</div>
                <div>${serviceFee}</div>
            </div>
            <div className='finalPriceWrapper'>
                <div className='finalPrice'>Total(USD)</div>
                <div className='finalPrice'>${totalPrice + cleaningFee + serviceFee}</div>
            </div>
            <button className='btn' onClick={handleBooking}>Confirm booking</button>
        </div>
    );
};
