import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookingsThunk } from '../../store/bookings';
import './AllTrips.css';
import { DeleteBookingModal } from '../DeleteBooking/DeleteBookingModal';

export const AllTrips = () => {
    const dispatch = useDispatch();
    const allBookings = useSelector(state => state.bookings);
    console.log(allBookings);

    const [totalBookings, setTotalBooking] = useState((Object.values(allBookings)).length);



    useEffect(() => {
        dispatch(getAllBookingsThunk());
    }, [dispatch, totalBookings]);

    return (
        <div>
            <div>{allBookings ? "Trips" : "No trips booked...yet!"}</div>
            <div>
                {allBookings && Object.values(allBookings).map(booking => (
                    <div className='booking-spot-container'>
                        <div className='booking-spot-img-container'>
                            <img src={booking.Spot.previewImage} alt="booking-spot" className="booking-spot-img" />
                        </div>
                        <div className='booking-spot-info-container'>
                            <div>
                                <div>{booking.Spot.address}</div>
                                <div>
                                    {booking.Spot.city} <span>{booking.Spot.state}</span><span>, {booking.Spot.country}</span>
                                </div>
                                <div>{booking.Spot.name}</div>
                            </div>
                            <div>
                                From {(booking.startDate).slice(0, 10)} to {(booking.endDate).slice(0, 10)}
                            </div>
                        </div>

                        <DeleteBookingModal
                            id={booking.id}
                            totalBookings={totalBookings}
                            setTotalBooking={setTotalBooking} />
                    </div>
                ))}
            </div>
        </div>
    );
};
