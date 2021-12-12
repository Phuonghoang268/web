import { reducer as formReducer } from 'redux-form';
import { Parks } from "./parks";
import { counterReducer } from './parks';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            parks: Parks,
            counterReducer: counterReducer,
            form: formReducer,
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}