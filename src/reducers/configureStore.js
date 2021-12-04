import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            form: formReducer,
            ...createForms({

            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}