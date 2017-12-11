import * as types from '../actions/types';
import initialState from './initialState';

export default function eventReducer(state = [], action)
{
    switch (action.type)
    {
        case types.EVENTS_LOADED:

            return {...state, events: action.events, eventsTotal: action.total} ;

            break;

        case types.EVENT_LOADED_SUCCESS:

            return {...state, event: action.event};

            break;

        case types.EVENT_LOADED_ERROR:

            return {...state, eventLoadError: action.error};

            break;

        case types.EVENT_CREATED_SUCCESS:

            return {...state, createdEvent: action.event, eventCreateErrors: [] };

            break;

        case types.EVENT_CREATED_ERROR:

            return {...state, eventCreateErrors: action.errors };

            break;

        case types.EVENT_EDITED_SUCCESS:

            return {...state, updatedEvent: action.event };

            break;

        case types.EVENT_EDITED_ERROR:

            return {...state, eventUpdateErrors: action.errors };

            break;

        case types.EVENT_DELETED_SUCCESS:

            return {...state, eventDeleteErrors: null};

            break;

        case types.EVENT_DELETED_ERROR:

            return {...state, eventDeleteErrors: action.errors};

            break;

        default:
            return state;
    }
}
