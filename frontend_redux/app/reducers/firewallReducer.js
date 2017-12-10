import * as types from '../actions/types';

export default function firewallReducer(state = {}, action)
{
    switch (action.type)
    {
        case types.ROUTER_LOCATION_CHANGE:

            return {...state, payload: Object.assign({}, action.payload)};

            break;

        default:
            return state;
    }
}
