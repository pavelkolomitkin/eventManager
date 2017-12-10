import * as types from '../actions/types';
import initialState from './initialState';

export default function statusReducer(state = [], action)
{
    switch (action.type)
    {
        case types.EVENT_STATUSES_LOADED:

            return action.statuses;

            break;

        default:
            return state;
    }
}
