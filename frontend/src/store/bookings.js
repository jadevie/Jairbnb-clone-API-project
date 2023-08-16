import { csrfFetch } from "./csrf";

const GET_ALL_BOOKINGS = 'bookings/GET_ALL_BOOKINGS';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';

export const getAllBookings = bookings => {
    return {
        type: GET_ALL_BOOKINGS,
        bookings
    };
};

export const deleteBooking = bookingId => {
    return {
        type: DELETE_BOOKING,
        bookingId
    };
};

export const getAllBookingsThunk = () => async dispatch => {
    const response = await fetch(`api/bookings/current`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllBookings(data));
        // console.log(data);
        return data;
    }
};

const initialState = {};

const bookingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_BOOKINGS:
            newState = { ...state };
            const bookingsData = action.bookings.Bookings;
            bookingsData.forEach(booking => (newState[booking.id]) = booking);
            return newState;
        default:
            return state;
    }
};

export default bookingReducer;
