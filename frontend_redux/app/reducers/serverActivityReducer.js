import * as types from '../actions/types';
import initialState from './initialState';

export default function serverActivityReducer(state = initialState.activeServerRequests, action) {
    switch (action.type)
    {
        case types.SERVER_REQUEST:
            return state + 1;

        case types.SERVER_RESPONSE:
            return state - 1;

        default:
            return state;
    }
}
