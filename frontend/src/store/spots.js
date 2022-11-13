
//* Create Types *//
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';

//* Action creater *//
export const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    };
};

//* Thunk *//
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllSpots(data.Spots));
        return data;
    }
};

//* Reducer *//
const spotsReducer = (state = {}, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case GET_ALL_SPOTS:
            // action.payload.map(spot => newState[spot.id] = spot);
            newState.Spots = action.payload;
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
