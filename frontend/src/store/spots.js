
import { csrfFetch } from './csrf';
//* Create Types *//
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const ADD_SPOT_IMAGE = 'spots/ADD_SPOT_IMAGE';
const GET_SPOT_DETAILS = 'spots/GET_SPOT_DETAILS';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const EDIT_SPOT = 'spots/EDIT_SPOT';

//* Action creater *//
export const getAllSpots = spots => {
    return {
        type: GET_ALL_SPOTS,
        spots
    };
};

export const createSpot = spot => {
    return {
        type: CREATE_SPOT,
        spot
    };
};

export const addSpotImage = image => {
    return {
        type: ADD_SPOT_IMAGE,
        image
    };
};

export const getSpotDetails = spot => {
    return {
        type: GET_SPOT_DETAILS,
        spot
    };
};

export const deleteSpot = id => {
    return {
        type: DELETE_SPOT,
        id
    };
};

export const editSpot = spot => {
    return {
        type: EDIT_SPOT,
        spot
    };
};

//* Thunk *//
export const getAllSpotsThunk = () => async dispatch => {
    const response = await fetch(`/api/spots`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllSpots(data)); // pass value from db
        return data;
    }
};

export const createSpotThunk = (data) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
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


export const addSpotImageThunk = (data, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const image = await response.json();
        dispatch(addSpotImage(image));
        return image;
    }
};


export const getSpotDetailsThunk = id => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(getSpotDetails(spot));
    }
};

export const deleteSpotThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const { id: spot } = await response.json();
        dispatch(deleteSpot(spot));
        return spot;
    }
    else if (!response.ok) {
        if (response.statusCode === 404) {
            let error = await response.json();
            throw new Error(error.message);
        }
    }
};

export const editSpotThunk = (data, id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const newData = await response.json();
        dispatch(editSpot(newData));
        return newData;
    }
};

//* Reducer *//
const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
    // let newState = Object.assign({}, state);
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = { ...state };
            const spotsArrayFromDb = action.spots.Spots;
            spotsArrayFromDb.forEach(spot => (
                newState.allSpots[spot.id] = spot));
            return newState;
        case CREATE_SPOT:
            newState = { ...state };
            newState.singleSpot = action.spot;
            return newState;
        case ADD_SPOT_IMAGE:
            newState = {
                ...state,
                ...action.image
            };
            return newState;
        case GET_SPOT_DETAILS:
            newState = { ...state };
            newState.singleSpot = action.spot;
            return newState;
        case DELETE_SPOT:
            newState = { ...state };
            delete newState[action.id];
            return newState;
        case EDIT_SPOT:
            newState = { ...state };
            newState.singleSpot = action.spot;
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
