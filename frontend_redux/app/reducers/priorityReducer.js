import * as types from '../actions/types';
import initialState from './initialState';

export default function priorityReducer(state = [], action)
{
    switch (action.type)
    {
        case types.EVENT_PRIORITIES_LOADED:

            return action.priorities;

            break;

        default:
            return state;
    }
}
