import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


// get parks
export const fetchParks = () => (dispatch) => {
    dispatch(parksLoading(true));

    return fetch(baseUrl + 'owner/parks/info')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(parks => dispatch(addParks(parks)))
        .catch(error => dispatch(parksFailed(error.message)));
}


export const parksLoading = () => ({
    type: ActionTypes.PARKS_LOADING
});

export const parksFailed = (errmess) => ({
    type: ActionTypes.PARKS_FAILED,
    payload: errmess
});

export const addParks = (parks) => ({
    type: ActionTypes.ADD_PARKS,
    payload: parks
});


export const incrementAction = () => dispatch => {
    dispatch({ type: ActionTypes.INCREMENT });
}

export const decrementAction = () => dispatch => {
    dispatch({ type: ActionTypes.DECREMENT });
}