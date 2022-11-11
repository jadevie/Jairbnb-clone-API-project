import { csrfFetch } from './csrf';

const LOGIN = "session/LOGIN";

//* Action creater *//
export const loginUser = (user) => {
    return {
        type: LOGIN,
        payload: user
    };
};

//* Thunk *//

// Log in
export const loginUserThunk = user => async (dispatch) => {
    const response = await csrfFetch(`/api/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(loginUser(data));
        return response;
    }
};

// Restore session user Thunk
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(loginUser(data));
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOGIN:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
