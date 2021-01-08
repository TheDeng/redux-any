'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = promiseMiddleware;

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _fluxStandardAction = require('flux-standard-action');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function promiseMiddleware(_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;

    return function (next) {
        return function (action) {

            return process(dispatch, getState, next, action);
        };
    };
}
function process(dispatch, getState, next, action) {
    if (Array.isArray(action)) {
        action.map(function (v) {
            return process(dispatch, getState, next, v);
        });
    } else {

        if (typeof action === 'function') {
            return action(dispatch, getState);
        }
        if (!(0, _fluxStandardAction.isFSA)(action)) {
            return (0, _isPromise2.default)(action) ? action.then(dispatch) : next(action);
        }

        return (0, _isPromise2.default)(action.payload) ? action.payload.then(function (result) {
            return dispatch(_extends({}, action, { payload: result }));
        }).catch(function (error) {
            dispatch(_extends({}, action, { payload: error, error: true }));
            return Promise.reject(error);
        }) : next(action);
    }
}