import * as types from '../actions/types';
import initialState from './initialState';

export default function profileReducer(state = {}, action)
{
    switch (action.type)
    {
        case types.USER_PROFILE_LOADED:

            return {...state, userProfile: action.profile};

            break;

        case types.USER_PROFILE_LOAD_ERROR:

            return {...state, userProfile: null, userProfileLoadError: true};

            break;

        default:
            return state;
    }
}