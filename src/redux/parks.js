import * as ActionTypes from "./ActionTypes";

export const Parks = (state = {
    isLoading: true,
    errMess: null,
    parks: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PARKS:
            return { ...state, isLoading: false, errMess: null, parks: action.payload }
        case ActionTypes.PARKS_LOADING:
            return { ...state, isLoading: true, errMess: null, parks: [] }
        case ActionTypes.PARKS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, parks: [] }
        default:
            return state;
    }
}

const initialState = {

    counter: 0
}

export function counterReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            }
        case ActionTypes.DECREMENT:
            return {
                ...state,
                counter: Math.max(state.counter - 1, 0)
            }
        default:
            return state;
    }
}