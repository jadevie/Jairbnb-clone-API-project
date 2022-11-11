import { csrfFetch } from './csrf';


// * Create Types *//
const LOGIN = 'session/LOGIN';
const LOGOUT = 'session/LOGOUT';


//* Action creater *//
// Log in
export const loginUser = (user) => {
    return {
        type: LOGIN,
        payload: user
    };
};

// Log out
export const logoutUser = () => {
    return {
        type: LOGOUT
    };
};


//* Thunk *//
// Log in
export const loginUserThunk = user => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch(`/api/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential, password })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(loginUser(data.user));
        return response;
    }
};

// Restore session user Thunk
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(loginUser(data.user));
    return response;
};

// Log out
export const logoutUserThunk = user => async (dispatch) => {
    const response = await csrfFetch(`/api/session`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(logoutUser());
        return response;
    }
};


//* Reducer *//
const initialState = { user: null };
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOGIN:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case LOGOUT:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
