import * as types from './types';
import ApiClient from '../services/ApiClient';
import * as serverActions from './serverActions';

export function loadUserProfile()
{
    return (dispatch) => {
        dispatch(serverActions.serverRequest());
        ApiClient.getInstance().loadUserProfile(
            (result) => {
                dispatch(userProfileLoaded(result.data));
                dispatch(serverActions.serverResponse());
            },
            () => {
                dispatch(userProfileLoadError());
                dispatch(serverActions.serverResponse());
            }
        );

    };
}

export function userProfileLoaded(profileData)
{
    return {type: types.USER_PROFILE_LOADED, profile: profileData};
}
export function userProfileLoadError() {
    return {type: types.USER_PROFILE_LOAD_ERROR};
}