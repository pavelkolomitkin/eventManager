import * as types from '../actions/types';
import initialState from './initialState';

export default function securityReducer(state = {}, action) {

    switch (action.type)
    {
        case types.USER_LOGIN_SUCCESS:

            return {...state, loginUserData: action.loginUserData};

            break;

        case types.USER_LOGIN_ERROR:

            return {...state, loginUserData: null, loginError: true};

            break;

        case types.USER_REGISTER_SUCCESS:

            return {...state, registerResult: action.data};

            break;

        case types.USER_REGISTER_ERROR:

            return {...state, errors: action.errors};

            break;

        case types.USER_LOGOUT:

            return {...state, loginUserData: null };

            break;

        default:
            return state;
    }
}
