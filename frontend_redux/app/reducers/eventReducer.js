import * as types from '../actions/types';
import initialState from './initialState';

export default function eventReducer(state = [], action)
{
    switch (action.type)
    {
        case types.EVENTS_LOADED:

            return action.events;

            break;

        case types.EVENT_LOADED_SUCCESS:

            return action.event;

            break;

        case types.EVENT_LOADED_ERROR:

            return action.error;

            break;

        case types.EVENT_CREATED_SUCCESS:

            return action.event;

            break;

        case types.EVENT_CREATED_ERROR:

            return action.errors;

            break;

        case types.EVENT_EDITED_SUCCESS:

            return action.event;

            break;

        case types.EVENT_EDITED_ERROR:

            return action.errors;

            break;

        case types.EVENT_DELETED_SUCCESS:

            return true;

            break;

        case types.EVENT_DELETED_ERROR:

            return false;

            break;

        default:
            return state;
    }
}
