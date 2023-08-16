import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookingsThunk } from '../../store/bookings';

export const AllTrips = () => {
    const dispatch = useDispatch();
    const allBookings = useSelector(state => state.bookings);
    console.log(allBookings);

    useEffect(() => {
        dispatch(getAllBookingsThunk());
    }, [dispatch]);

    return (
        <div>
            <div>Your trips</div>
            <div>
                {allBookings && Object.values(allBookings).map(booking => (
                    <div>
                        <div>
                            {booking.Spot.previewImage}
                        </div>
                        <div>
                            {booking.Spot.address}
                        </div>
                        <div>
                            {booking.Spot.city}
                        </div>
                        <div>
                            {booking.Spot.state}
                        </div>
                        <div>
                            {booking.Spot.country}
                        </div>
                        <div>
                            {booking.Spot.name}
                        </div>
                        <div>{booking.startDate}</div>
                        <div>{booking.endDate}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
