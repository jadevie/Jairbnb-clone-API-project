import { csrfFetch } from './csrf';

const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
// const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
const GET_REVIEWS = 'reviews/GET_REVIEWS';

export const createReview = review => {
    return {
        type: CREATE_REVIEW,
        review
    };
};

export const getReviews = reviews => {
    return {
        type: GET_REVIEWS,
        reviews
    };
};

// export const deleteReview = id => {
//     return {
//         type: DELETE_REVIEW,
//         id
//     };
// };


export const getReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'GET'
    });

    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviews(reviews));
        return reviews;
    }
};

export const createReviewThunk = (spotId, data) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(createReview(review));
        return review;
    }
};

// export const deleteReviewThunk = id => async dispatch => {
//     const response = await csrfFetch(`/api/reviews/${id}`);
// };

const initialState = { spotReviews: {} };
const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = {
                spotReviews: {}
            };
            const reviewsArrayFromDb = action.reviews.Reviews;
            reviewsArrayFromDb.forEach(review => newState.spotReviews[review.id] = review);
            return newState;
        case CREATE_REVIEW:
            newState = {
                ...state
            };
            newState.spotReviews[action.review.id] = action.review;
            return newState;
        default:
            return state;
    }


};
export default reviewsReducer;
