import { csrfFetch } from './csrf';
//* Create Types *//
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const CREATE_SPOT = 'spots/CREATE_SPOT';

//* Action creater *//
export const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    };
};

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    };
};

//* Thunk *//
export const getAllSpotsThunk = () => async dispatch => {
    const response = await fetch(`/api/spots`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllSpots(data.Spots));
        return data;
    }
};

export const createSpotThunk = (data) => async dispatch => {
    const response = await csrfFetch(`api/spots`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(createSpot(spot));
        return spot;
    }
};

//* Reducer *//
const spotsReducer = (state = {}, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case GET_ALL_SPOTS:
            newState.Spots = action.payload;
            return newState;
        case CREATE_SPOT:
            newState = {
                ...action.spot
            };
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
