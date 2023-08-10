import React, { useState } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Moment from 'moment';
import { useDispatch } from 'react-redux';
import { createBookingThunk } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './CreateBooking.css';

export const CreateBooking = ({ price, avgStarRating, avgRating, reviews }) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    console.log(currentDate);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [onFocus, setOnFocus] = useState([startDate, endDate]);
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const start = Moment(startDate).format('YYYY-MM-DD'); //2023-05-15
    const end = Moment(endDate).format('YYYY-MM-DD'); //2023-05-20


    let totalDays = 0;
    const thirtyDays = [4, 6, 9, 11];
    const pickedStartMonth = Number(start.slice(5, 7));
    const pickedEndMonth = Number(end.slice(5, 7));
    const pickedStartDay = Number(start.slice(8));
    const pickedEndDay = Number(end.slice(8));
    const pickedYear = Number(start.slice(0, 4));

    const findTotal = () => {
        if (pickedStartMonth === pickedEndMonth) {
            totalDays = pickedEndDay - pickedStartDay;
            return;
        }
        if (pickedStartMonth !== pickedEndMonth && pickedStartMonth === 2 && pickedYear === 2024) {
            totalDays = (29 - pickedStartDay) + pickedEndDay;
            return;
        }
        if (pickedStartMonth !== pickedEndMonth && pickedStartMonth === 2 && pickedYear !== 2024) {
            totalDays = (28 - pickedStartDay) + pickedEndDay;
            return;
        }
        for (let month of thirtyDays) {
            if (pickedStartMonth !== pickedEndMonth && pickedStartMonth === month) {
                totalDays = (30 - pickedStartDay) + pickedEndDay;
                return;
            }
        }
        totalDays = (31 - pickedStartDay) + pickedEndDay;
        return totalDays;
    };
    findTotal();

    const totalPrice = (totalDays || 1) * price;
    const cleaningFee = (totalDays || 1) * 50;
    const serviceFee = Number((totalPrice * 0.14).toFixed(0));

    const handleBooking = async e => {
        e.preventDefault();
        const booking = {
            startDate: start,
            endDate: end
        };
        await dispatch(createBookingThunk(spotId, booking));
    };

    return (
        <div className='wrapper'>
            <div className='info-wrapper'>
                <div className='price'>{`$${price}`}<span style={{ fontWeight: 400, fontSize: '16px', color: '#3c3c3c' }}> night</span>
                </div>
                <div>
                    <i className="fa-solid fa-star" style={{ fontSize: '12px', padding: '5px' }}></i>
                    {avgStarRating && `${avgRating} - ${reviews} reviews`}
                </div>
            </div>
            <div className='datePicker'>
                <DateRangePicker
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    onDatesChange={({ startDate, endDate }) => {
                        setStartDate(startDate);
                        setEndDate(endDate);
                    }} // PropTypes.func.isRequired,
                    focusedInput={onFocus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => setOnFocus(focusedInput)} // PropTypes.func.isRequired,
                ></DateRangePicker>
            </div>

            <button onClick={handleBooking} className='btn'>Reserve</button>
            <div className='noCharge'>You won't be charged yet</div>

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
                <div className='finalPrice'>Total before taxes</div>
                <div className='finalPrice'>${totalPrice + cleaningFee + serviceFee}</div>
            </div>
        </div >
    );
};
