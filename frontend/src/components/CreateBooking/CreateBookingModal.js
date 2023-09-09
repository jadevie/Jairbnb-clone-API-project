import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { RequestToBookForm } from './RequestToBookForm';
import LoginForm from '../LoginFormModal/LoginForm.js';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { MustPickDayForm } from './MustPickDayForm';

function CreateBookingModal({
    user,
    start,
    end,
    price,
    totalPrice,
    cleaningFee,
    serviceFee,
    totalDays,
    id }) {
    const [showModal, setShowModal] = useState(false);
    const owner = useSelector(state => state.spots.singleSpot);
    const dayIsNotSelectedYet = (isNaN(Number(start[0]))) || (isNaN(Number(end[0])));


    const allBookings = useSelector(state => state.spots.singleSpot).bookings;

    const spotBooking = allBookings && allBookings.Bookings.filter(booking => booking.spotId == id);
    console.log(spotBooking, start, end);

    const checkAvailability = () => {
        if (spotBooking) {
            for (let i = 0; i < spotBooking.length; i++) {
                const booking = spotBooking[i];
                const bookingStartDate = Moment(booking.startDate).format('YYYY-MM-DD');
                const bookingEndDate = Moment(booking.endDate).format('YYYY-MM-DD');

                const isNewStartDayAfterBookingEndDay = Moment(start).isAfter(bookingEndDate);

                const isNewEndDayBeforeBookingStartDay = Moment(end).isBefore(bookingStartDate);

                if (!(isNewStartDayAfterBookingEndDay || isNewEndDayBeforeBookingStartDay)) return false;
            }
            return true;
        }
    };
    // console.log(checkAvailability());

    return (
        <>
            <button
                className={!user || (user && user.id !== owner.ownerId) ? 'btn' : 'disabledBtn'}
                disabled={(user && (user.id === owner.ownerId))}
                onClick={() => setShowModal(true)}
            >
                {user ? 'Reserve' : 'Log in to book'}
            </button >
            {showModal && (
                user ?
                    <Modal onClose={() => setShowModal(false)}>
                        {dayIsNotSelectedYet || !checkAvailability() ?
                            <MustPickDayForm hideModal={() => setShowModal(false)} /> :
                            <RequestToBookForm
                                user={user}
                                hideModal={() => setShowModal(false)}
                                start={start}
                                end={end}
                                price={price}
                                totalPrice={totalPrice}
                                cleaningFee={cleaningFee}
                                serviceFee={serviceFee}
                                totalDays={totalDays} />
                        }
                    </Modal> :
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm setShowModal={setShowModal} />
                    </Modal>
            )
            }
        </>
    );
};

export default CreateBookingModal;
