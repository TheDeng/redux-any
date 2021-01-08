import isPromise from 'is-promise';
import { isFSA } from 'flux-standard-action';

export default function promiseMiddleware({ dispatch, getState }) {
    return next => action => {

        return process(dispatch, getState, next, action)

    };
}
function process(dispatch, getState, next, action) {
    if (Array.isArray(action)) {
        action.map(v => {
            return process(dispatch, getState, next, v)
        })
    } else {


        if (typeof action === 'function') {
            return action(dispatch, getState);
        }
        if (!isFSA(action)) {
            return isPromise(action) ? action.then(dispatch) : next(action);
        }

        return isPromise(action.payload)
            ? action.payload
                .then(result => dispatch({ ...action, payload: result }))
                .catch(error => {
                    dispatch({ ...action, payload: error, error: true });
                    return Promise.reject(error);
                })
            : next(action);

    }

}
